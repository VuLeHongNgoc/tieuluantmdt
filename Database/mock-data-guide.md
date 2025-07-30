# Hướng dẫn thêm dữ liệu mẫu (Mock Data)

Tài liệu này hướng dẫn cách thêm 16 sản phẩm mẫu vào cơ sở dữ liệu MongoDB để có tổng cộng 20 sản phẩm trên website.

## Thông tin Mock Data

Script `add-mock-products.js` sẽ thêm các sản phẩm sau vào cơ sở dữ liệu:

1. **Áo khoác Adidas Originals** - Thời trang nam
2. **Quần Jean H&M Slim Fit** - Thời trang nam
3. **Váy H&M Floral Pattern** - Thời trang nữ
4. **Áo sơ mi Zara Oversized** - Thời trang nữ
5. **Giày Adidas Ultraboost** - Giày dép
6. **Giày cao gót Gucci Leather** - Giày dép
7. **Samsung Galaxy S24 Ultra** - Điện tử
8. **Apple AirPods Pro 2** - Phụ kiện
9. **Ví Gucci GG Marmont** - Phụ kiện
10. **Bóng đá Nike Flight Premier League** - Thể thao
11. **Dụng cụ tập thể hình Adidas** - Thể thao
12. **Son môi Chanel Rouge Allure** - Làm đẹp
13. **Nước hoa Chanel Coco Mademoiselle** - Làm đẹp
14. **Apple MacBook Pro M3** - Điện tử
15. **Apple Watch Series 9** - Phụ kiện
16. **Quần thể thao Nike Dri-FIT** - Thể thao
17. **Túi xách Gucci GG Marmont** - Phụ kiện
18. **Áo khoác Zara Oversized** - Thời trang nữ
19. **Quần Jeans Levi's 501** - Thời trang nam
20. **Áo Polo Lacoste Classic Fit** - Thời trang nam

Mỗi sản phẩm đều có các biến thể (variants) với màu sắc, kích thước và số lượng tồn kho khác nhau.

## Cách thực hiện

### Bước 1: Kiểm tra Node.js

Đảm bảo bạn đã cài đặt Node.js phiên bản v20.19.4 hoặc mới hơn:

```bash
node -v
```

### Bước 2: Chạy script thêm sản phẩm

```bash
node Database\add-mock-products.js
```

Lưu ý: Nếu bạn đang ở thư mục gốc của dự án (D:\TieuLuanTMDT). Nếu gặp lỗi đường dẫn, hãy thử dùng đường dẫn tuyệt đối:

```bash
node D:\TieuLuanTMDT\Database\add-mock-products.js
```

Khi chạy thành công, bạn sẽ thấy thông báo xác nhận số lượng sản phẩm đã được thêm và tổng số sản phẩm trong cơ sở dữ liệu.

### Bước 3: Kiểm tra kết quả

Sau khi thêm dữ liệu mẫu, bạn có thể kiểm tra xem các sản phẩm đã được thêm vào cơ sở dữ liệu chưa bằng cách:

1. Truy cập MongoDB Atlas và kiểm tra collection `products`
2. Hoặc mở trình duyệt và truy cập API endpoints của bạn:
   - `http://localhost:3000/api/products`

## Lưu ý

- Script này sẽ thêm 16 sản phẩm mẫu vào cơ sở dữ liệu của bạn
- Các sản phẩm này được thiết kế để đa dạng về loại sản phẩm, thương hiệu và danh mục
- Mỗi sản phẩm đều có hình ảnh từ các nguồn online để hiển thị trên website

## Tùy chỉnh

Nếu bạn muốn thêm hoặc chỉnh sửa sản phẩm mẫu, bạn có thể chỉnh sửa mảng `mockProducts` trong file `add-mock-products.js` và thêm các sản phẩm với cấu trúc tương tự.
