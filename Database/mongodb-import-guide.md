# 🚀 Hướng dẫn Import dữ liệu vào MongoDB Atlas

## Bước 1: Kết nối MongoDB Atlas

1. **Tạo Cluster trên MongoDB Atlas**
   - Truy cập [MongoDB Atlas](https://cloud.mongodb.com)
   - Tạo account và cluster miễn phí
   - Chọn region gần nhất (Singapore cho Việt Nam)

2. **Cấu hình Database Access**
   - Tạo database user với quyền `readWrite`
   - Username: `ecom-user`
   - Password: tạo password mạnh

3. **Cấu hình Network Access**
   - Thêm IP address hiện tại
   - Hoặc thêm `0.0.0.0/0` cho development (không an toàn cho production)

## Bước 2: Lấy Connection String

```
mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/<database-name>?retryWrites=true&w=majority
```

Ví dụ:

```
mongodb+srv://ecom-user:your-password@cluster0.abc123.mongodb.net/ecom2?retryWrites=true&w=majority
```

## Bước 3: Import dữ liệu bằng MongoDB Compass

## Sử dụng MongoDB Compass (Giao diện đồ họa)

1. **Mở MongoDB Compass**
2. **Connect** với connection string từ Atlas
3. **Tạo Database**: `ecom2`
4. **Import từng collection**:
   - Tạo collection `categories` → Import từ file JSON
   - Tạo collection `brands` → Import từ file JSON
   - Tương tự cho các collections khác

## Bước 4: Kiểm tra kết quả

Sau khi import thành công:

```javascript
// Kiểm tra số lượng documents
db.categories.countDocuments();
db.products.countDocuments();
db.users.countDocuments();

// Kiểm tra một vài sản phẩm
db.products.find().limit(2).pretty();

// Kiểm tra indexes
db.products.getIndexes();
```

## Bước 5: Cấu hình cho Next.js

**Tạo file `.env.local`:**

```env
MONGODB_URI=mongodb+srv://ecom-user:your-password@cluster0.abc123.mongodb.net/ecom2?retryWrites=true&w=majority
MONGODB_DB=ecom2
```

**Cài đặt dependencies:**

```bash
npm install mongodb mongoose
```

### Ưu điểm của MongoDB cho E-commerce:

✅ **Flexible Schema**: Dễ thêm fields mới
✅ **Embedded Documents**: Products với variants và images
✅ **JSON Native**: Phù hợp với React/Next.js
✅ **Horizontal Scaling**: Dễ scale khi traffic tăng
✅ **Atlas Managed**: Không cần quản lý server

### Performance Tips:

🚀 **Indexing**: Đã tạo indexes cho search và query thường dùng
🚀 **Aggregation**: Sử dụng cho reports và analytics
🚀 **Embedding vs Referencing**: Cân bằng giữa performance và consistency

## 🎯 Next Steps

1. Import dữ liệu thành công
2. Tạo Next.js project với Mongoose
3. Implement các API routes
4. Tạo admin dashboard
5. Build user interface

Chúc bạn thành công với dự án e-commerce! 🛍️
