import connectDB from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const connection = await connectDB();
    
    return NextResponse.json({
      success: true,
      message: 'Connected to MongoDB successfully!',
      database: connection.connection.db?.databaseName || 'ecommerce',
      host: connection.connection.host,
      readyState: connection.connection.readyState,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to connect to MongoDB',
        error: (error as Error).message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
