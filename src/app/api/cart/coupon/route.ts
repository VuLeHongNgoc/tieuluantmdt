import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/cart/coupon - Apply coupon code
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    if (!body.userId || !body.code) {
      return NextResponse.json(
        { success: false, message: 'User ID and coupon code are required' },
        { status: 400 }
      );
    }
    
    const { userId, code } = body;
    
    await connectDB();
    const db = mongoose.connection.db;
    
    if (!db) {
      return NextResponse.json(
        { success: false, message: 'Database connection not established' },
        { status: 500 }
      );
    }
    
    // Find user's cart
    const cart = await db.collection('carts').findOne({ userId });
    
    if (!cart || !cart.items || cart.items.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Cart not found or empty' },
        { status: 404 }
      );
    }
    
    // In a real application, we would check if the coupon exists and is valid
    // For now, we'll simulate a coupon validation with fixed discount values
    
    // Simulated coupon validation
    const validCoupons = {
      'WELCOME10': { type: 'percentage', value: 10 },
      'SAVE20': { type: 'percentage', value: 20 },
      'FREESHIP': { type: 'fixed', value: 30000 },
      'SUMMER25': { type: 'percentage', value: 25 }
    };
    
    // @ts-ignore - We're using a fixed object for demo purposes
    const coupon = validCoupons[code.toUpperCase()];
    
    if (!coupon) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired coupon code' },
        { status: 400 }
      );
    }
    
    // Apply coupon to cart
    cart.coupon = {
      code: code.toUpperCase(),
      type: coupon.type,
      value: coupon.value,
      appliedAt: new Date()
    };
    
    cart.updatedAt = new Date();
    
    // Update the cart
    await db.collection('carts').updateOne(
      { userId },
      { $set: cart }
    );
    
    // Return the updated cart with calculated discount
    // Fetch product details first to calculate the total price
    let totalPrice = 0;
    
    if (cart.items.length > 0) {
      const productIds = cart.items.map((item: any) => item.productId);
      const products = await db.collection('products')
        .find({ _id: { $in: productIds } })
        .toArray();
      
      const productMap: Record<string, any> = {};
      products.forEach((product: any) => {
        productMap[String(product._id)] = product;
      });
      
      // Calculate total price
      for (const item of cart.items) {
        const product = productMap[String(item.productId)];
        if (product) {
          let price = product.price;
          
          // Check for variant price if applicable
          if (item.variantId && product.variants) {
            const variant = product.variants.find((v: any) => v._id === item.variantId);
            if (variant && variant.price) {
              price = variant.price;
            }
          }
          
          totalPrice += price * item.quantity;
        }
      }
    }
    
    // Calculate discount
    let discount = 0;
    if (coupon.type === 'percentage') {
      discount = totalPrice * (coupon.value / 100);
    } else if (coupon.type === 'fixed') {
      discount = coupon.value;
    }
    
    // Calculate final price after discount
    const finalPrice = Math.max(0, totalPrice - discount);
    
    return NextResponse.json({
      success: true,
      message: 'Coupon applied successfully',
      cart: {
        ...cart,
        totalPrice,
        discount,
        finalPrice
      }
    });
  } catch (error: any) {
    console.error(`Error applying coupon: ${error}`);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to apply coupon',
        error: error.message
      },
      { status: 500 }
    );
  }
}
