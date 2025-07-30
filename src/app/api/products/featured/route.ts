import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const db = mongoose.connection.db;
    
    if (!db) {
      return NextResponse.json(
        { success: false, message: 'Database connection not established' },
        { status: 500 }
      );
    }
    
    // Find featured products - either isNew or isHot set to true
    const featuredProducts = await db.collection('products')
      .find({ $or: [{ isNew: true }, { isHot: true }] })
      .sort({ createdAt: -1 }) // Latest first
      .limit(8) // Limit to 8 featured products
      .toArray();
    
    return NextResponse.json(featuredProducts);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch featured products' },
      { status: 500 }
    );
  }
}
