import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/users/[id] - Get user by ID (Admin only)
 * Note: In a real application, this would verify admin role
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Await params before accessing properties
    const { id } = await params;
    const userId = id;
    
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
    
    // Admin check would go here in a real application
    // For testing purposes, we'll skip role check
    
    // Find user by ID
    const user = await db.collection('users').findOne({ _id: userId } as any);
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }
    
    // Remove sensitive data
    const { password, ...userWithoutPassword } = user as any;
    
    return NextResponse.json({
      success: true,
      user: userWithoutPassword
    });
  } catch (error: any) {
    console.error(`Error fetching user: ${error}`);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch user',
        error: error.message
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/users/[id] - Update user (Admin only)
 * Note: In a real application, this would verify admin role
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    const body = await request.json();
    
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
    
    // Admin check would go here in a real application
    // For testing purposes, we'll skip role check
    
    // Find user by ID to verify existence
    const existingUser = await db.collection('users').findOne({ _id: userId } as any);
    
    if (!existingUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }
    
    // Create update object with allowed fields
    const updateData: Record<string, any> = {};
    const allowedFields = ['name', 'email', 'phone', 'address', 'avatar', 'role'];
    
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }
    
    // Add updatedAt timestamp
    updateData.updatedAt = new Date();
    
    // Don't proceed if no fields to update
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { success: false, message: 'No valid fields to update' },
        { status: 400 }
      );
    }
    
    // Update user
    const result = await db.collection('users').updateOne(
      { _id: userId } as any,
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }
    
    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'No changes were made to the user' },
        { status: 400 }
      );
    }
    
    // Get updated user
    const updatedUser = await db.collection('users').findOne({ _id: userId } as any);
    
    // Remove sensitive data
    const { password, ...userWithoutPassword } = updatedUser as any;
    
    return NextResponse.json({
      success: true,
      message: 'User updated successfully',
      user: userWithoutPassword
    });
  } catch (error: any) {
    console.error(`Error updating user: ${error}`);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update user',
        error: error.message
      },
      { status: 500 }
    );
  }
}
