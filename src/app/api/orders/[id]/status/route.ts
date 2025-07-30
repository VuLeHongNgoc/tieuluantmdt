import dbConnect from '@/../Backend/lib/mongodb';
import Order from '@/../Backend/models/Order';
import { auth } from '@/app/auth';
import { NextRequest, NextResponse } from 'next/server';

/**
 * PUT /api/orders/[id]/status
 * 
 * Update order status (Admin only)
 */
export async function PUT(
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
    
    // Check if user is admin
    if ((session.user as any).role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }
    
    // Get request body
    const { status } = await request.json();
    
    // Validate status
    const validStatuses = ['PENDING', 'PREPARING', 'SHIPPING', 'DELIVERED', 'CANCELLED'];
    
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { message: 'Invalid status' },
        { status: 400 }
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
    
    try {
      // Update status
      await order.updateStatus(status);
      
      return NextResponse.json({
        message: 'Order status updated successfully',
        status: order.status
      });
    } catch (statusError) {
      return NextResponse.json(
        { message: (statusError as Error).message },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error updating order status:', error);
    return NextResponse.json(
      { message: 'Error updating order status', error: (error as Error).message },
      { status: 500 }
    );
  }
}
