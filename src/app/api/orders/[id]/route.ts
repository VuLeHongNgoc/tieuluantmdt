import dbConnect from '@/../Backend/lib/mongodb';
import Order from '@/../Backend/models/Order';
import { auth } from '@/app/auth';
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/orders/[id]
 * 
 * Get order details
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    // Get user session
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized' }, 
        { status: 401 }
      );
    }
    
    // Connect to the database
    await dbConnect();
    
    // Find the order
    const order = await Order.findOne({ _id: id });
    
    if (!order) {
      return NextResponse.json(
        { message: 'Order not found' },
        { status: 404 }
      );
    }
    
    // Check if the order belongs to the current user or user is admin
    if (order.userId !== session.user.id && (session.user as any).role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Forbidden' },
        { status: 403 }
      );
    }
    
    return NextResponse.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { message: 'Error fetching order', error: (error as Error).message },
      { status: 500 }
    );
  }
}
