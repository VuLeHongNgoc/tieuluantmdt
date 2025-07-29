import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/categories - Lấy tất cả danh mục
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
    
    // Lấy danh sách categories
    const categories = await db.collection('categories').find({}).toArray();
    
    // Tính số lượng sản phẩm cho mỗi category
    const categoriesWithCount = await Promise.all(
      categories.map(async (category) => {
        const productCount = await db.collection('products').countDocuments({
          categoryId: category._id
        });
        
        return {
          ...category,
          productCount
        };
      })
    );
    
    return NextResponse.json({
      success: true,
      categories: categoriesWithCount
    });
  } catch (error: any) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch categories',
        error: error.message
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/categories - Tạo danh mục mới (Admin only)
 */
export async function POST(request: NextRequest) {
  try {
    // TODO: Implement authentication to check for admin role
    // const session = await getServerSession(authOptions);
    // if (!session || session.user.role !== 'ADMIN') {
    //   return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    // }
    
    const body = await request.json();
    
    // Validate category data
    if (!body.name) {
      return NextResponse.json(
        { success: false, message: 'Category name is required' },
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
    
    // Tạo slug từ tên danh mục nếu không được cung cấp
    const slug = body.slug || body.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    
    // Kiểm tra slug đã tồn tại chưa
    const existingCategory = await db.collection('categories').findOne({ slug });
    if (existingCategory) {
      return NextResponse.json(
        { success: false, message: 'Category with this slug already exists' },
        { status: 400 }
      );
    }
    
    // Tìm ID lớn nhất hiện tại để tạo ID mới
    const lastCategory = await db.collection('categories')
      .find()
      .sort({ _id: -1 })
      .limit(1)
      .toArray();
      
    const newId = lastCategory.length > 0 ? Number(lastCategory[0]._id) + 1 : 1;
    
    // Tạo category mới
    const newCategory = {
      name: body.name,
      slug: slug,
      description: body.description || '',
      imageUrl: body.imageUrl || null,
      active: body.active !== undefined ? body.active : true,
      parentId: body.parentId || null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Thêm _id dưới dạng số nguyên - sử dụng insertOne với _id
    // Chuyển đổi sang native MongoDB document để tránh lỗi TypeScript
    const document = { _id: newId, ...newCategory };
    const result = await db.collection('categories').insertOne(document as any);
    
    return NextResponse.json({
      success: true,
      message: 'Category created successfully',
      category: newCategory
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create category',
        error: error.message
      },
      { status: 500 }
    );
  }
}
