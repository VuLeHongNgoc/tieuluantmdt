import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/users/profile - Get current user profile
 */
export async function GET(request: NextRequest) {
  try {
    // Get user from session
    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET 
    });
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    const userId = token.id;
    
    await connectDB();
    const db = mongoose.connection.db;
    
    if (!db) {
      return NextResponse.json(
        { success: false, message: 'Database connection not established' },
        { status: 500 }
      );
    }
    
    // Find user by ID
    const user = await db.collection('users').findOne({ _id: userId } as any);
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }
    
    // Remove sensitive data (password) before sending response
    const { password, ...userWithoutPassword } = user as any;
    
    return NextResponse.json({
      success: true,
      ...userWithoutPassword
    });
  } catch (error: any) {
    console.error(`Error fetching user profile: ${error}`);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch user profile',
        error: error.message
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/users/profile - Update user profile
 * Note: In a real application, this would use the authenticated session
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    // In a real app, this would come from session/auth
    // For testing purposes, we'll use the ID from the body
    const userId = body.userId;
    
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
    
    // Find user by ID to verify existence
    const existingUser = await db.collection('users').findOne({ _id: userId } as any);
    
    if (!existingUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }
    
    // Create update object with allowed fields only
    const updateData: Record<string, any> = {};
    const allowedFields = ['name', 'phone', 'address', 'avatar'];
    
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
    
    // Update user profile
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
        { success: false, message: 'No changes were made to the profile' },
        { status: 400 }
      );
    }
    
    // Get updated user
    const updatedUser = await db.collection('users').findOne({ _id: userId } as any);
    
    // Remove sensitive data
    const { password, ...userWithoutPassword } = updatedUser as any;
    
    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      user: userWithoutPassword
    });
  } catch (error: any) {
    console.error(`Error updating user profile: ${error}`);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update user profile',
        error: error.message
      },
      { status: 500 }
    );
  }
}
