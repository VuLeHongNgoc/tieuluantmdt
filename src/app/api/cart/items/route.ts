import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/cart/items - Add item to cart
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    if (!body.userId || !body.productId) {
      return NextResponse.json(
        { success: false, message: 'User ID and Product ID are required' },
        { status: 400 }
      );
    }
    
    const { userId, productId, variantId, quantity = 1 } = body;
    
    await connectDB();
    const db = mongoose.connection.db;
    
    if (!db) {
      return NextResponse.json(
        { success: false, message: 'Database connection not established' },
        { status: 500 }
      );
    }
    
    // Verify that product exists
    const product = await db.collection('products').findOne({ _id: productId });
    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }
    
    // If variantId is provided, verify that the variant exists
    if (variantId) {
      const variantExists = product.variants && 
        product.variants.some((variant: any) => variant._id === variantId);
      
      if (!variantExists) {
        return NextResponse.json(
          { success: false, message: 'Product variant not found' },
          { status: 404 }
        );
      }
    }
    
    // Find user's cart or create a new one
    let cart = await db.collection('carts').findOne({ userId });
    
    if (!cart) {
      // Create new cart
      cart = {
        _id: require('crypto').randomUUID(),
        userId,
        items: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
    }
    
    // Check if item already exists in cart
    const existingItemIndex = cart.items?.findIndex(
      (item: any) => item.productId === productId && 
        (variantId ? item.variantId === variantId : !item.variantId)
    );
    
    if (existingItemIndex > -1) {
      // Update quantity of existing item
      cart.items[existingItemIndex].quantity += quantity;
      cart.items[existingItemIndex].updatedAt = new Date();
    } else {
      // Add new item to cart
      const newItem = {
        _id: require('crypto').randomUUID(),
        productId,
        // Make sure variantId is set even if null to match schema (but model expects it required)
        variantId: variantId || 'default',
        quantity,
        addedAt: new Date()
      };
      
      if (!cart.items) {
        cart.items = [];
      }
      
      cart.items.push(newItem);
    }
    
    cart.updatedAt = new Date();
    
    // Save or update the cart with debug logging
    console.log('Saving cart to database:', JSON.stringify(cart, null, 2));
    
    try {
      // Use upsert to ensure it creates a new document if it doesn't exist
      const result = await db.collection('carts').updateOne(
        { userId },
        { $set: cart },
        { upsert: true }
      );
      
      console.log('Database operation result:', JSON.stringify(result, null, 2));
      
      // Double-check that the cart was saved
      const savedCart = await db.collection('carts').findOne({ userId });
      console.log('Saved cart in database:', savedCart ? 'Found' : 'Not found', 
                  savedCart ? `with ${savedCart.items?.length || 0} items` : '');
    } catch (dbError) {
      console.error('Database operation failed:', dbError);
      throw dbError;
    }
    
    // Return the updated cart
    // To keep response consistent, we'll use the same GET cart logic
    const response = await fetch(`${request.nextUrl.origin}/api/cart?userId=${userId}`, {
      headers: { 'Content-Type': 'application/json' }
    });
    const updatedCart = await response.json();
    
    return NextResponse.json({
      success: true,
      message: 'Item added to cart',
      cart: updatedCart.cart
    });
  } catch (error: any) {
    console.error(`Error adding item to cart: ${error}`);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to add item to cart',
        error: error.message
      },
      { status: 500 }
    );
  }
}
