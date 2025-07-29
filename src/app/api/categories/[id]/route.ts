import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/categories/[id] - Lấy chi tiết danh mục và các sản phẩm thuộc danh mục đó
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const categoryId = params.id;
    
    if (!categoryId) {
      return NextResponse.json(
        { success: false, message: 'Category ID is required' },
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
    
    // Tìm category theo ID hoặc slug
    let category;
    if (!isNaN(Number(categoryId))) {
      // Nếu ID là số
      category = await db.collection('categories').findOne({ _id: Number(categoryId) } as any);
    } else {
      // Nếu ID là slug
      category = await db.collection('categories').findOne({ slug: categoryId });
    }
    
    if (!category) {
      return NextResponse.json(
        { success: false, message: 'Category not found' },
        { status: 404 }
      );
    }
    
    // Lấy danh sách sản phẩm của category
    const products = await db.collection('products')
      .find({ categoryId: category._id })
      .sort({ createdAt: -1 })
      .toArray();
    
    return NextResponse.json({
      success: true,
      category,
      products
    });
  } catch (error: any) {
    console.error(`Error fetching category details: ${error}`);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch category details',
        error: error.message
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/categories/[id] - Cập nhật thông tin danh mục (Admin only)
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: Implement authentication to check for admin role
    // const session = await getServerSession(authOptions);
    // if (!session || session.user.role !== 'ADMIN') {
    //   return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    // }
    
    const categoryId = params.id;
    const body = await request.json();
    
    if (!categoryId) {
      return NextResponse.json(
        { success: false, message: 'Category ID is required' },
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
    
    // Kiểm tra xem category có tồn tại không
    let existingCategory;
    if (!isNaN(Number(categoryId))) {
      existingCategory = await db.collection('categories').findOne({ _id: Number(categoryId) } as any);
    } else {
      existingCategory = await db.collection('categories').findOne({ slug: categoryId });
    }
    
    if (!existingCategory) {
      return NextResponse.json(
        { success: false, message: 'Category not found' },
        { status: 404 }
      );
    }
    
    // Nếu slug được cập nhật, kiểm tra xem nó có bị trùng không
    if (body.slug && body.slug !== existingCategory.slug) {
      const duplicateSlug = await db.collection('categories').findOne({ 
        slug: body.slug,
        _id: { $ne: existingCategory._id }
      });
      
      if (duplicateSlug) {
        return NextResponse.json(
          { success: false, message: 'Category with this slug already exists' },
          { status: 400 }
        );
      }
    }
    
    // Tạo đối tượng cập nhật
    const updateData = {
      ...body,
      updatedAt: new Date()
    };
    
    // Xóa các trường không được phép cập nhật
    delete updateData._id;
    delete updateData.createdAt;
    
    // Cập nhật category
    const result = await db.collection('categories').updateOne(
      { _id: existingCategory._id },
      { $set: updateData }
    );
    
    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'No changes were made' },
        { status: 400 }
      );
    }
    
    // Lấy category đã cập nhật
    const updatedCategory = await db.collection('categories').findOne({ _id: existingCategory._id });
    
    return NextResponse.json({
      success: true,
      message: 'Category updated successfully',
      category: updatedCategory
    });
  } catch (error: any) {
    console.error(`Error updating category: ${error}`);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update category',
        error: error.message
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/categories/[id] - Xóa danh mục (Admin only)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: Implement authentication to check for admin role
    // const session = await getServerSession(authOptions);
    // if (!session || session.user.role !== 'ADMIN') {
    //   return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    // }
    
    const categoryId = params.id;
    
    if (!categoryId) {
      return NextResponse.json(
        { success: false, message: 'Category ID is required' },
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
    
    // Tìm category trước khi xóa để kiểm tra xem nó có tồn tại không
    let category;
    if (!isNaN(Number(categoryId))) {
      category = await db.collection('categories').findOne({ _id: Number(categoryId) } as any);
    } else {
      category = await db.collection('categories').findOne({ slug: categoryId });
    }
    
    if (!category) {
      return NextResponse.json(
        { success: false, message: 'Category not found' },
        { status: 404 }
      );
    }
    
    // Kiểm tra xem có sản phẩm nào thuộc category này không
    const productsCount = await db.collection('products').countDocuments({ categoryId: category._id });
    
    if (productsCount > 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: `Cannot delete category: ${productsCount} products are using this category`,
          productsCount
        },
        { status: 400 }
      );
    }
    
    // Xóa category
    const result = await db.collection('categories').deleteOne({ _id: category._id });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Failed to delete category' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Category deleted successfully',
      categoryId: category._id
    });
  } catch (error: any) {
    console.error(`Error deleting category: ${error}`);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete category',
        error: error.message
      },
      { status: 500 }
    );
  }
}
