import connectDB from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const mongoose = await connectDB();
    const db = mongoose.connection.db;
    
    // Count documents in each collection
    const stats = {
      categories: await db.collection('categories').countDocuments(),
      brands: await db.collection('brands').countDocuments(),
      users: await db.collection('users').countDocuments(),
      products: await db.collection('products').countDocuments(),
      carts: await db.collection('carts').countDocuments(),
      orders: await db.collection('orders').countDocuments(),
      enums: await db.collection('enums').countDocuments(),
    };

    // Get sample data from each collection
    const sampleData = {
      categories: await db.collection('categories').find({}).limit(3).toArray(),
      brands: await db.collection('brands').find({}).limit(3).toArray(),
      users: await db.collection('users').find({}, { projection: { password: 0 } }).limit(2).toArray(),
      products: await db.collection('products').find({}).limit(2).toArray(),
      orders: await db.collection('orders').find({}).limit(1).toArray(),
      enums: await db.collection('enums').find({}).toArray(),
    };

    return NextResponse.json({
      success: true,
      message: 'Sample data verification complete',
      stats,
      sampleData,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Database verification error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
