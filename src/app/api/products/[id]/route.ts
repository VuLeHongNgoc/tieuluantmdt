import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/products/[id] - Lấy thông tin chi tiết một sản phẩm
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // In Next.js App Router, we should await dynamic params
    const { id } = await params;
    const productId = id;
    
    if (!productId) {
      return NextResponse.json(
        { success: false, message: 'Product ID is required' },
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
    
    // Enhanced debugging
    console.log(`Searching for product with ID or slug: "${productId}"`);
    
    // Get all product IDs to debug
    const allProducts = await db.collection('products').find({}).project({ _id: 1, slug: 1 }).toArray();
    console.log('Available products:', allProducts.map(p => ({ _id: p._id, slug: p.slug })));
    
    // Cast the collection to any to bypass TypeScript errors
    const productsCollection = db.collection('products') as any;
    
    // Try to find by string _id first
    let product = await productsCollection.findOne({ _id: productId });
    console.log(`Lookup by _id: ${product ? 'FOUND' : 'NOT FOUND'}`);
    
    // If not found, try by slug
    if (!product) {
      product = await productsCollection.findOne({ slug: productId });
      console.log(`Lookup by slug: ${product ? 'FOUND' : 'NOT FOUND'}`);
    }
    
    if (!product) {
      console.log(`Product not found with ID or slug: ${productId}`);
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Lấy category của sản phẩm nếu có
    let category = null;
    if (product.categoryId) {
      category = await db.collection('categories').findOne({ _id: product.categoryId });
    }
    
    // Lấy brand của sản phẩm nếu có
    let brand = null;
    if (product.brandId) {
      brand = await db.collection('brands').findOne({ _id: product.brandId });
    }
    
    // Tìm các sản phẩm liên quan
    const relatedProducts = await db.collection('products')
      .find({
        $and: [
          { _id: { $ne: product._id } }, // Không phải sản phẩm hiện tại
          { categoryId: product.categoryId }, // Cùng category
        ]
      })
      .limit(4)
      .toArray();
    
    return NextResponse.json({
      success: true,
      product: {
        ...product,
        category,
        brand,
        relatedProducts
      }
    });
  } catch (error: any) {
    console.error(`Error fetching product details: ${error}`);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch product details',
        error: error.message
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/products/[id] - Cập nhật thông tin sản phẩm (Admin only)
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
    
    const productId = params.id;
    const body = await request.json();
    
    if (!productId) {
      return NextResponse.json(
        { success: false, message: 'Product ID is required' },
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
    
    // Kiểm tra xem sản phẩm có tồn tại không
    const existingProduct = await db.collection('products').findOne({
      $or: [
        { productId: productId },
        { slug: productId }
      ]
    });
    
    if (!existingProduct) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Tạo đối tượng cập nhật
    const updateData = {
      ...body,
      updatedAt: new Date()
    };
    
    // Xóa các trường không được phép cập nhật
    delete updateData._id;
    delete updateData.createdAt;
    
    // Cập nhật sản phẩm
    const result = await db.collection('products').updateOne(
      { _id: existingProduct._id },
      { $set: updateData }
    );
    
    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'No changes were made' },
        { status: 400 }
      );
    }
    
    // Lấy sản phẩm đã cập nhật
    const updatedProduct = await db.collection('products').findOne({ _id: existingProduct._id });
    
    return NextResponse.json({
      success: true,
      message: 'Product updated successfully',
      product: updatedProduct
    });
  } catch (error: any) {
    console.error(`Error updating product: ${error}`);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update product',
        error: error.message
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/products/[id] - Xóa sản phẩm (Admin only)
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
    
    const productId = params.id;
    
    if (!productId) {
      return NextResponse.json(
        { success: false, message: 'Product ID is required' },
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
    
    // Tìm sản phẩm trước khi xóa để kiểm tra xem nó có tồn tại không
    const product = await db.collection('products').findOne({
      $or: [
        { productId: productId },
        { slug: productId }
      ]
    });
    
    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Xóa sản phẩm
    const result = await db.collection('products').deleteOne({ _id: product._id });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Failed to delete product' },
        { status: 500 }
      );
    }
    
    // TODO: Có thể cần xử lý các tham chiếu đến sản phẩm trong các bảng khác
    // ví dụ: xóa sản phẩm khỏi giỏ hàng, đơn hàng đang chờ,...
    
    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully',
      productId: product._id
    });
  } catch (error: any) {
    console.error(`Error deleting product: ${error}`);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete product',
        error: error.message
      },
      { status: 500 }
    );
  }
}
