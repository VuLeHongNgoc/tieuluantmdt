import dbConnect from '@/../Backend/lib/mongodb';
import { auth } from '@/app/auth';
import { NextRequest, NextResponse } from 'next/server';

import Cart from '../../../../Backend/models/Cart';
import Order from '../../../../Backend/models/Order';
import Product from '../../../../Backend/models/Product';

/**
 * GET /api/orders
 * 
 * Get all orders for the current user
 */
export async function GET(request: NextRequest) {
  try {
    // Get user session
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized' }, 
        { status: 401 }
      );
    }
    
    // Connect to the database
    await dbConnect();
    
    // Find all orders for the current user
    // Use find method directly instead of static method
    const orders = await Order.find({ userId: session.user.id }).sort({ createdAt: -1 });
    
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { message: 'Error fetching orders', error: (error as Error).message },
      { status: 500 }
    );
  }
}

/**
 * POST /api/orders
 * 
 * Create a new order from the current cart
 */
export async function POST(request: NextRequest) {
  try {
    // Get user session
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized' }, 
        { status: 401 }
      );
    }
    
    // Get request body
    const { paymentMethod, customerInfo } = await request.json();
    
    // Validate required fields
    if (!paymentMethod || !customerInfo) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Connect to the database
    await dbConnect();
    
    // Find user cart
    const cart = await Cart.findOne({ userId: session.user.id }).populate('items.productId');
    
    if (!cart || cart.items.length === 0) {
      return NextResponse.json(
        { message: 'Cart is empty' },
        { status: 400 }
      );
    }
    
    // Calculate order total and prepare order items
    let total = 0;
    const orderItems = [];
    
    // Process each cart item
    for (const cartItem of cart.items) {
      // Get the product
      const product = await Product.findOne({ _id: cartItem.productId });
      
      if (!product) {
        return NextResponse.json(
          { message: `Product not found: ${cartItem.productId}` },
          { status: 400 }
        );
      }
      
      // Find the variant
      const variant = product.variants.find((v: { _id: string }) => v._id === cartItem.variantId);
      
      if (!variant) {
        return NextResponse.json(
          { message: `Variant not found for product: ${cartItem.productId}` },
          { status: 400 }
        );
      }
      
      // Check stock
      if (variant.stock < cartItem.quantity) {
        return NextResponse.json(
          { 
            message: `Not enough stock for product: ${product.name}`, 
            product: product.name,
            available: variant.stock,
            requested: cartItem.quantity
          },
          { status: 400 }
        );
      }
      
      // Calculate item total - use priceOverride from variant if available, otherwise use product's base price
      console.log('Product price details:');
      console.log('- Product base price:', product.price);
      console.log('- Variant:', variant);
      console.log('- Variant priceOverride:', variant.priceOverride);
      
      // Check if price is 0 or missing
      if (!product.price && (variant.priceOverride === null || variant.priceOverride === undefined)) {
        console.error('❌ CRITICAL: Both product price and variant price are missing or 0!');
        console.log('Full product data:', JSON.stringify(product, null, 2));
      }
      
      const itemPrice = variant.priceOverride !== null && variant.priceOverride !== undefined 
        ? variant.priceOverride 
        : product.price;
        
      console.log(`Product: ${product.name}, Variant: ${variant._id}, Final price used: ${itemPrice}`);
      
      if (isNaN(itemPrice) || itemPrice === undefined || itemPrice === null) {
        return NextResponse.json(
          { message: `Invalid price for product: ${product.name}` },
          { status: 400 }
        );
      }
      
      const itemTotal = itemPrice * cartItem.quantity;
      
      // Add to order total
      total += itemTotal;
      
      // Create order item
      orderItems.push({
        variantId: variant._id,
        productId: product._id,
        productName: product.name,
        color: variant.color || 'Default',
        size: variant.size || 'OneSize',
        quantity: cartItem.quantity,
        unitPrice: itemPrice
      });
      
      // Update stock (decrease by ordered quantity)
      variant.stock -= cartItem.quantity;
      await product.save();
    }
    
    // Validate order total before creating
    if (isNaN(total) || total <= 0) {
      console.error('Invalid order total:', total);
      return NextResponse.json(
        { message: 'Invalid order total', total },
        { status: 400 }
      );
    }
    
    console.log('Creating order with total:', total, 'and items:', orderItems);
    
    // Create the order
    const order = new Order({
      userId: session.user.id,
      status: 'PENDING',
      paymentMethod,
      total,
      items: orderItems,
      customerInfo
    });
    
    // Save the order with proper validation
    try {
      // Validate the order before saving
      const validationError = order.validateSync();
      if (validationError) {
        console.error('Order validation error:', validationError);
        return NextResponse.json(
          { message: 'Order validation failed', error: validationError.message },
          { status: 400 }
        );
      }
      
      // Save the order
      const savedOrder = await order.save();
      console.log('Order saved successfully:', savedOrder._id);
      
      // Clear the cart after successful order creation
      try {
        await cart.clearCart();
        console.log('Cart cleared successfully');
      } catch (clearCartError) {
        console.error('Failed to clear cart:', clearCartError);
        // Continue even if cart clearing fails
      }
      
      return NextResponse.json(
        { message: 'Order created successfully', order: savedOrder },
        { status: 201 }
      );
    } catch (saveError) {
      console.error('Error saving order:', saveError);
      return NextResponse.json(
        { message: 'Error saving order', error: (saveError as Error).message },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { message: 'Error creating order', error: (error as Error).message },
      { status: 500 }
    );
  }
}
