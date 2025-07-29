import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

/**
 * PUT /api/cart/items/[id] - Update cart item quantity
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const itemId = params.id;
    if (!itemId) {
      return NextResponse.json(
        { success: false, message: 'Item ID is required' },
        { status: 400 }
      );
    }
    
    const body = await request.json();
    
    // Validate input
    if (!body.userId) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }
    
    if (body.quantity === undefined || body.quantity < 0) {
      return NextResponse.json(
        { success: false, message: 'Valid quantity is required' },
        { status: 400 }
      );
    }
    
    const { userId, quantity } = body;
    
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
    
    // Find the item in the cart
    const itemIndex = cart.items.findIndex((item: any) => item._id === itemId);
    
    if (itemIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Item not found in cart' },
        { status: 404 }
      );
    }
    
    if (quantity === 0) {
      // Remove item from cart if quantity is 0
      cart.items.splice(itemIndex, 1);
    } else {
      // Update quantity
      cart.items[itemIndex].quantity = quantity;
      cart.items[itemIndex].updatedAt = new Date();
    }
    
    cart.updatedAt = new Date();
    
    // Update the cart
    await db.collection('carts').updateOne(
      { userId },
      { $set: cart }
    );
    
    // Return the updated cart
    // To keep response consistent, we'll use the same GET cart logic
    const response = await fetch(`${request.nextUrl.origin}/api/cart?userId=${userId}`, {
      headers: { 'Content-Type': 'application/json' }
    });
    const updatedCart = await response.json();
    
    return NextResponse.json({
      success: true,
      message: quantity === 0 ? 'Item removed from cart' : 'Item quantity updated',
      cart: updatedCart.cart
    });
  } catch (error: any) {
    console.error(`Error updating cart item: ${error}`);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update cart item',
        error: error.message
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/cart/items/[id] - Remove item from cart
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const itemId = params.id;
    if (!itemId) {
      return NextResponse.json(
        { success: false, message: 'Item ID is required' },
        { status: 400 }
      );
    }
    
    // Get userId from query param
    const userId = request.nextUrl.searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }
    
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
    
    // Find the item in the cart
    const itemIndex = cart.items.findIndex((item: any) => item._id === itemId);
    
    if (itemIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Item not found in cart' },
        { status: 404 }
      );
    }
    
    // Remove the item
    cart.items.splice(itemIndex, 1);
    cart.updatedAt = new Date();
    
    // Update the cart
    await db.collection('carts').updateOne(
      { userId },
      { $set: cart }
    );
    
    // Return the updated cart
    // To keep response consistent, we'll use the same GET cart logic
    const response = await fetch(`${request.nextUrl.origin}/api/cart?userId=${userId}`, {
      headers: { 'Content-Type': 'application/json' }
    });
    const updatedCart = await response.json();
    
    return NextResponse.json({
      success: true,
      message: 'Item removed from cart',
      cart: updatedCart.cart
    });
  } catch (error: any) {
    console.error(`Error removing cart item: ${error}`);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to remove cart item',
        error: error.message
      },
      { status: 500 }
    );
  }
}
