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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
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
    const body = await request.json();
    const { status } = body;
    
    console.log('Updating order status:', { orderId: id, newStatus: status, body });
    
    // Validate status
    const validStatuses = ['PENDING', 'PREPARING', 'SHIPPING', 'DELIVERED', 'CANCELLED'];
    
    if (!status || !validStatuses.includes(status)) {
      console.log('Invalid status:', status);
      return NextResponse.json(
        { message: 'Invalid status' },
        { status: 400 }
      );
    }
    
    // Connect to the database
    await dbConnect();
    
    // Find the order
    const order = await Order.findOne({ _id: id });
    
    console.log('Found order:', { orderId: id, orderExists: !!order, currentStatus: order?.status });
    
    if (!order) {
      return NextResponse.json(
        { message: 'Order not found' },
        { status: 404 }
      );
    }
    
    // Update status directly (bypass transition rules for admin)
    console.log('Updating order status from', order.status, 'to', status);
    order.status = status;
    await order.save();
    
    console.log('Order status updated successfully');
    
    return NextResponse.json({
      message: 'Order status updated successfully',
      status: order.status
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    return NextResponse.json(
      { message: 'Error updating order status', error: (error as Error).message },
      { status: 500 }
    );
  }
}
