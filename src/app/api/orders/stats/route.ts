import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const db = mongoose.connection.db;
    
    if (!db) {
      return NextResponse.json(
        { success: false, message: 'Database connection not established' },
        { status: 500 }
      );
    }

    // Get total orders count
    const totalOrders = await db.collection('orders').countDocuments();
    
    // Get total revenue
    const revenueResult = await db.collection('orders').aggregate([
      { $match: { status: { $in: ['completed', 'delivered'] } } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]).toArray();
    
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;
    
    // Get orders by status
    const statusStats = await db.collection('orders').aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]).toArray();
    
    // Get recent orders (last 5)
    const recentOrders = await db.collection('orders')
      .find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();

    return NextResponse.json({
      success: true,
      stats: {
        totalOrders,
        totalRevenue,
        statusStats,
        recentOrders
      }
    });
  } catch (error: any) {
    console.error('Error fetching order stats:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch order stats',
        error: error.message
      },
      { status: 500 }
    );
  }
}
