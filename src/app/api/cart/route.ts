import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

// Define types for our cart items
interface CartItem {
  _id: string;
  productId: string;
  variantId: string;
  quantity: number;
  addedAt: Date;
  product?: any;
  variant?: any;
  price?: number;
  total?: number;
}

interface Cart {
  _id: string;
  userId: string;
  items: CartItem[];
  createdAt?: Date;
  updatedAt?: Date;
  totalItems?: number;
  totalPrice?: number;
  coupon?: any;
}

/**
 * GET /api/cart - Get cart for current user
 * Note: In a real application, this would use authentication to get the current user
 * For now, we'll use a userId from the query parameter for testing purposes
 */
export async function GET(request: NextRequest) {
  try {
    // In a real app, this would come from session/auth
    // For testing purposes, we'll use query param
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
    
    // Find the user's cart with debug logging
    console.log('Looking for cart with userId:', userId);
    const cart = await db.collection('carts').findOne({ userId });
    console.log('Cart found:', cart ? 'Yes' : 'No');
    
    if (cart) {
      console.log('Items in cart:', cart.items?.length || 0);
    }
    
    if (!cart) {
      // If no cart exists, return an empty cart structure
      console.log('No cart found, returning empty cart');
      return NextResponse.json({
        success: true,
        cart: {
          userId,
          items: [],
          totalItems: 0,
          totalPrice: 0,
          coupon: null
        }
      });
    }
    
    // Populate product details for each item in the cart
    let totalPrice = 0;
    let cartWithProducts = { ...cart, items: [] as CartItem[] };
    
    if (cart.items && cart.items.length > 0) {
      const productIds = cart.items.map((item: CartItem) => item.productId);
      const products = await db.collection('products')
        .find({ _id: { $in: productIds } })
        .toArray();
      
      // Create a map for quick product lookup
      const productMap: Record<string, any> = products.reduce((map: Record<string, any>, product: any) => {
        map[String(product._id)] = product;
        return map;
      }, {});
      
      // Enrich cart items with product details
      cartWithProducts.items = cart.items.map((item: CartItem) => {
        const product = productMap[String(item.productId)];
        
        if (!product) {
          return item;
        }
        
        // Find the variant if it exists
        let variant = null;
        if (product.variants && product.variants.length > 0) {
          variant = product.variants.find((v: any) => v._id === item.variantId) || null;
        }
        
        const price = variant ? variant.price : product.price;
        const itemTotal = price * item.quantity;
        totalPrice += itemTotal;
        
        return {
          ...item,
          product: {
            _id: product._id,
            name: product.name,
            slug: product.slug,
            price: product.price,
            // Sử dụng images nếu có sẵn
            imageUrl: product.imageUrl || (product.images && product.images[0]?.imageUrl) || '',
            // Thêm thuộc tính image cho tương thích ngược
            image: product.imageUrl || (product.images && product.images[0]?.imageUrl) || '',
          },
          variant: variant ? {
            _id: variant._id,
            name: variant.name,
            price: variant.price,
            imageUrl: variant.imageUrl || '',
            attributes: variant.attributes || {}
          } : null,
          price,
          total: itemTotal
        };
      });
    }
    
    // Add calculated fields
    const totalItems = cart.items?.reduce((sum: number, item: CartItem) => sum + item.quantity, 0) || 0;
    
    return NextResponse.json({
      success: true,
      cart: {
        ...cartWithProducts,
        totalItems,
        totalPrice
      }
    });
  } catch (error: any) {
    console.error(`Error fetching cart: ${error}`);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch cart',
        error: error.message
      },
      { status: 500 }
    );
  }
}
