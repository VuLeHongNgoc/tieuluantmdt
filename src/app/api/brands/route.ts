import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/brands - Lấy danh sách tất cả các brands
 */
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
    
    // Lấy tất cả brands từ database
    const brands = await db.collection('brands').find({}).sort({ _id: 1 }).toArray();
    
    // Đếm số lượng sản phẩm cho mỗi brand
    const brandsWithProductCount = await Promise.all(
      brands.map(async (brand) => {
        const productCount = await db.collection('products').countDocuments({ brandId: brand._id });
        return {
          ...brand,
          productCount
        };
      })
    );
    
    return NextResponse.json({
      success: true,
      count: brands.length,
      brands: brandsWithProductCount
    });
  } catch (error: any) {
    console.error(`Error fetching brands: ${error}`);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch brands',
        error: error.message
      },
      { status: 500 }
    );
  }
}
