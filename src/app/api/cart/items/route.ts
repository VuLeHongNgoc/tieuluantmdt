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
    
    const { userId, productId, quantity = 1 } = body;
    let { variantId } = body;
    
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
      // Log for debugging
      console.log('Checking variant existence. Product:', productId);
      console.log('Looking for variantId:', variantId);
      
      // Ensure product.variants exists
      if (!product.variants || !Array.isArray(product.variants) || product.variants.length === 0) {
        console.log('Product has no variants!');
        console.log('Product data:', JSON.stringify(product, null, 2));
        return NextResponse.json(
          { success: false, message: 'Product has no variants defined' },
          { status: 404 }
        );
      }
      
      console.log('Available variants:', product.variants.map((v: any) => ({
        id: v._id,
        color: v.color,
        size: v.size
      })));
      
      // Convert both to strings before comparing to avoid type mismatches
      const matchedVariant = product.variants.find(
        (variant: any) => String(variant._id) === String(variantId)
      );
      
      if (!matchedVariant) {
        console.log('Variant not found in product!');
        // Check if this is a simple string comparison issue
        for (const variant of product.variants) {
          const idMatch = String(variant._id).includes(String(variantId)) || 
                        String(variantId).includes(String(variant._id));
          
          if (idMatch) {
            console.log('Found similar variant ID:', variant._id);
            // Use this similar variant instead
            variantId = variant._id;
            console.log('Updated variantId to:', variantId);
            break;
          }
        }
        
        // Re-check with potentially updated variantId
        const variantExists = product.variants.some(
          (variant: any) => String(variant._id) === String(variantId)
        );
        
        if (!variantExists) {
          return NextResponse.json(
            { success: false, message: 'Product variant not found' },
            { status: 404 }
          );
        }
      } else {
        console.log('Variant found successfully:', matchedVariant);
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
    console.log('Checking if item exists in cart. Items:', cart.items?.length || 0);
    
    const existingItemIndex = cart.items?.findIndex(
      (item: any) => String(item.productId) === String(productId) && 
        (variantId ? String(item.variantId) === String(variantId) : !item.variantId)
    );
    
    console.log('Item exists in cart?', existingItemIndex > -1 ? 'Yes' : 'No');
    
    if (existingItemIndex > -1) {
      // Update quantity of existing item
      cart.items[existingItemIndex].quantity += quantity;
      cart.items[existingItemIndex].updatedAt = new Date();
    } else {
      // If no variantId is provided, try to find an appropriate one
      if (!variantId && product.variants && product.variants.length > 0) {
        // Just use the first variant
        variantId = String(product.variants[0]._id);
        console.log('No variantId provided. Using first available variant:', variantId);
      }
      
      // Final check to ensure we have a valid variantId
      if (!variantId && product.variants && product.variants.length > 0) {
        variantId = String(product.variants[0]._id);
      } else if (!variantId) {
        // If we still don't have a variantId and there are no variants, use a placeholder
        console.log('⚠️ No variants found for product. Using placeholder variant ID.');
        variantId = 'default';
      }
      
      // Add new item to cart
      const newItem = {
        _id: require('crypto').randomUUID(),
        productId: String(productId),
        variantId: String(variantId),
        quantity,
        addedAt: new Date()
      };
      
      console.log('Adding new item to cart with variantId:', variantId);
      
      console.log('Adding new item to cart:', newItem);
      
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
