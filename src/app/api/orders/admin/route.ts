import dbConnect from '@/../Backend/lib/mongodb';
import { auth } from '@/app/auth';
import { NextRequest, NextResponse } from 'next/server';
import Order from '../../../../../Backend/models/Order';

/**
 * GET /api/orders/admin
 * 
 * Get all orders for admin (requires admin role)
 */
export async function GET(request: NextRequest) {
  try {
    // Get user session
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized' }, 
        { status: 401 }
      );
    }

    // Check if user is admin
    if (session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Access denied. Admin role required.' }, 
        { status: 403 }
      );
    }
    
    // Connect to the database
    await dbConnect();
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    
    // Build query
    const query: any = {};
    
    if (status && status !== 'all') {
      query.status = status;
    }
    
    if (search) {
      query.$or = [
        { orderNumber: { $regex: search, $options: 'i' } },
        { 'customerInfo.name': { $regex: search, $options: 'i' } },
        { 'customerInfo.email': { $regex: search, $options: 'i' } }
      ];
    }
    
    // Calculate skip
    const skip = (page - 1) * limit;
    
    // Get orders with pagination
    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('userId', 'name email');
    
    // Get total count
    const total = await Order.countDocuments(query);
    
    return NextResponse.json({
      orders,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { message: 'Error fetching orders', error: (error as Error).message },
      { status: 500 }
    );
  }
} 