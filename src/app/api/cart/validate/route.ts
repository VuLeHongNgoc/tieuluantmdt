import dbConnect from '@/../Backend/lib/mongodb';
import { auth } from '@/app/auth';
import { NextRequest, NextResponse } from 'next/server';

import Cart from '../../../../../Backend/models/Cart';
import Product from '../../../../../Backend/models/Product';

/**
 * GET /api/cart/validate
 * 
 * Validate cart before checkout
 */
export async function GET(request: NextRequest) {
  try {
    // Get user session
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Bạn cần đăng nhập để tiếp tục thanh toán.' }, 
        { status: 401 }
      );
    }
    
    // Connect to the database
    await dbConnect();
    
    // Find user cart
    const cart = await Cart.findOne({ userId: session.user.id });
    
    // Check if cart exists and has items
    if (!cart || cart.items.length === 0) {
      return NextResponse.json(
        { message: 'Giỏ hàng trống. Vui lòng thêm sản phẩm vào giỏ hàng.' },
        { status: 400 }
      );
    }
    
    // Validate stock for each item
    const outOfStockItems = [];
    
    for (const cartItem of cart.items) {
      // Get the product
      const product = await Product.findOne({ _id: cartItem.productId });
      
      if (!product) {
        outOfStockItems.push({
          productId: cartItem.productId,
          reason: 'Sản phẩm không tồn tại'
        });
        continue;
      }
      
      // Log information for debugging
      console.log('Checking variant for product:', product.name);
      console.log('Cart item variantId:', cartItem.variantId);
      console.log('Available variants:', product.variants.map((v: any) => v._id));
      
      // Check if this is a "default" variantId (legacy issue)
      let variant;
      if (cartItem.variantId === 'default') {
        console.log('Found legacy "default" variantId, attempting to use first available variant');
        
        // Use the first available variant instead
        if (product.variants && product.variants.length > 0) {
          variant = product.variants[0];
          console.log('Using first variant as replacement:', variant._id);
          
          // Update the cart item with the correct variantId for future requests
          try {
            await Cart.updateOne(
              { 
                userId: session.user.id, 
                "items._id": cartItem._id 
              },
              { 
                $set: { "items.$.variantId": variant._id } 
              }
            );
            console.log('Updated cart item with correct variantId:', variant._id);
          } catch (updateError) {
            console.error('Failed to update cart item variantId:', updateError);
            // Continue with validation even if update fails
          }
        } else {
          console.log('No variants available for this product');
        }
      } else {
        // Normal case - find the variant by ID
        variant = product.variants.find((v: any) => String(v._id) === String(cartItem.variantId));
      }
      
      if (!variant) {
        console.log('Variant not found!');
        outOfStockItems.push({
          productId: cartItem.productId,
          productName: product.name,
          variantId: cartItem.variantId,
          reason: 'Biến thể sản phẩm không tồn tại'
        });
        continue;
      }
      
      console.log('Variant found:', variant);
      console.log('Stock check: available =', variant.stock, 'requested =', cartItem.quantity);
      
      // Check if stock is sufficient
      if (variant.stock < cartItem.quantity) {
        console.log('Insufficient stock!');
        outOfStockItems.push({
          productId: cartItem.productId,
          productName: product.name,
          variantId: cartItem.variantId,
          available: variant.stock,
          requested: cartItem.quantity,
          reason: `Chỉ còn ${variant.stock} sản phẩm trong kho`
        });
      }
    }
    
    // If there are any out of stock items
    if (outOfStockItems.length > 0) {
      return NextResponse.json(
        { 
          message: 'Một số sản phẩm trong giỏ hàng không đủ số lượng', 
          outOfStockItems 
        },
        { status: 400 }
      );
    }
    
    // Cart is valid
    return NextResponse.json({ 
      message: 'Giỏ hàng hợp lệ',
      valid: true,
      cartId: cart._id,
      itemCount: cart.items.length
    });
    
  } catch (error) {
    console.error('Error validating cart:', error);
    return NextResponse.json(
      { message: 'Lỗi kiểm tra giỏ hàng', error: (error as Error).message },
      { status: 500 }
    );
  }
}
