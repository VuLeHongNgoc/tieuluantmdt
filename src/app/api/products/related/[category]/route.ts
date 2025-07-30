import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { category: string } }
) {
  try {
    // Await params before accessing properties
    const { category } = await params;
    const categoryId = category;
    const { searchParams } = new URL(request.url);
    const excludeId = searchParams.get('excludeId') || '';
    const limit = parseInt(searchParams.get('limit') || '4');
    
    if (!categoryId) {
      return NextResponse.json(
        { success: false, message: 'Category ID is required' },
        { status: 400 }
      );
    }
    
    // Find related products from the same category, excluding the current product
    const query: any = { category: categoryId };
    if (excludeId) {
      query._id = { $ne: excludeId };
    }
    
    await connectDB();
    const db = mongoose.connection.db;
    
    if (!db) {
      return NextResponse.json(
        { success: false, message: 'Database connection not established' },
        { status: 500 }
      );
    }
    
    // Find related products in the products collection
    const relatedProducts = await db.collection('products')
      .find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();
    
    return NextResponse.json(relatedProducts);
  } catch (error) {
    console.error('Error fetching related products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch related products' },
      { status: 500 }
    );
  }
}
