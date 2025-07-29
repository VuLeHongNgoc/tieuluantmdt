import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/users - Get all users (Admin only)
 * Note: In a real application, this would verify admin role
 */
export async function GET(request: NextRequest) {
  try {
    const page = parseInt(request.nextUrl.searchParams.get('page') || '1');
    const limit = parseInt(request.nextUrl.searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    
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
    
    // Count total users
    const totalUsers = await db.collection('users').countDocuments({});
    
    // Get paginated users
    const users = await db
      .collection('users')
      .find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();
    
    // Remove sensitive data (password) from each user
    const usersWithoutPasswords = users.map(user => {
      const { password, ...userWithoutPassword } = user as any;
      return userWithoutPassword;
    });
    
    // Calculate pagination info
    const totalPages = Math.ceil(totalUsers / limit);
    
    return NextResponse.json({
      success: true,
      users: usersWithoutPasswords,
      pagination: {
        totalUsers,
        totalPages,
        currentPage: page,
        limit
      }
    });
  } catch (error: any) {
    console.error(`Error fetching users: ${error}`);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch users',
        error: error.message
      },
      { status: 500 }
    );
  }
}
