import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/products - Lấy danh sách sản phẩm có phân trang và lọc
 * 
 * Query params:
 * - page: Trang hiện tại (mặc định: 1)
 * - limit: Số sản phẩm mỗi trang (mặc định: 10)
 * - category: ID hoặc slug của category để lọc
 * - search: Từ khóa tìm kiếm
 * - sort: Sắp xếp (newest, price-asc, price-desc, name-asc, name-desc)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Lấy và xác thực query parameters
    const page = Math.max(1, Number(searchParams.get('page')) || 1);
    const limit = Math.min(50, Math.max(1, Number(searchParams.get('limit')) || 10));
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort') || 'newest';
    
    // Kết nối đến MongoDB
    await connectDB();
    
    // Xây dựng query dựa trên tham số
    const query: any = {};
    
    // Lọc theo category nếu có
    if (category) {
      // Kiểm tra nếu category là số (ID) hoặc string (slug)
      if (!isNaN(Number(category))) {
        query.categoryId = Number(category);
      } else {
        // Tìm category bằng slug
        const db = mongoose.connection.db;
        if (db) {
          const categoryDoc = await db.collection('categories')
            .findOne({ slug: category });
          
          if (categoryDoc) {
            query.categoryId = categoryDoc._id;
          }
        }
      }
    }
    
    // Tìm kiếm theo từ khóa
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
      ];
    }
    
    // Tính toán số lượng bản ghi để skip
    const skip = (page - 1) * limit;
    
    // Xác định cách sắp xếp
    let sortOptions: any = {};
    switch (sort) {
      case 'price-asc':
        sortOptions.price = 1;
        break;
      case 'price-desc':
        sortOptions.price = -1;
        break;
      case 'name-asc':
        sortOptions.name = 1;
        break;
      case 'name-desc':
        sortOptions.name = -1;
        break;
      case 'newest':
      default:
        sortOptions.createdAt = -1;
        break;
    }
    
    const db = mongoose.connection.db;
    
    if (!db) {
      return NextResponse.json(
        { success: false, message: 'Database connection not established' },
        { status: 500 }
      );
    }
    
    // Truy vấn sản phẩm với phân trang và sắp xếp
    const products = await db.collection('products')
      .find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .toArray();
    
    // Đếm tổng số sản phẩm thỏa mãn query
    const total = await db.collection('products').countDocuments(query);
    
    // Tính toán thông tin phân trang
    const totalPages = Math.ceil(total / limit);
    
    // Trả về kết quả
    return NextResponse.json({
      success: true,
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      }
    });
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch products',
        error: error.message
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/products - Tạo sản phẩm mới (Admin only)
 * 
 * Body: Product data
 */
export async function POST(request: NextRequest) {
  try {
    // TODO: Implement authentication to check for admin role
    // const session = await getServerSession(authOptions);
    // if (!session || session.user.role !== 'ADMIN') {
    //   return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    // }
    
    const body = await request.json();
    
    // Validate product data
    if (!body.name || !body.price) {
      return NextResponse.json(
        { success: false, message: 'Product name and price are required' },
        { status: 400 }
      );
    }
    
    // Generate unique ID for product
    const productId = `product_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
    
    // Create product object
    const product = {
      name: body.name,
      slug: body.slug || body.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
      price: body.price,
      salePrice: body.salePrice,
      description: body.description || '',
      shortDescription: body.shortDescription || '',
      images: body.images || [],
      categoryId: body.categoryId,
      brandId: body.brandId,
      variants: body.variants || [],
      featured: body.featured || false,
      tags: body.tags || [],
      ratings: {
        average: 0,
        count: 0
      },
      stock: body.stock || 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    await connectDB();
    const db = mongoose.connection.db;
    
    if (!db) {
      return NextResponse.json(
        { success: false, message: 'Database connection not established' },
        { status: 500 }
      );
    }
    
    // Insert product with the product ID as a string field rather than _id
    const productWithId = {
      ...product,
      productId: productId // Store as a field instead of _id
    };
    
    const insertResult = await db.collection('products').insertOne(productWithId);
    
    return NextResponse.json({
      success: true,
      message: 'Product created successfully',
      product
    }, { status: 201 });
    
  } catch (error: any) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create product',
        error: error.message
      },
      { status: 500 }
    );
  }
}
