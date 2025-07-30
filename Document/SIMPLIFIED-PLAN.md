# Kế hoạch đơn giản hóa các yêu cầu

## Các yêu cầu đáp ứng ở mức tối thiểu

### 1. Thanh toán trực tuyến (Bài lab 01)
- **PayPal Sandbox** (đơn giản hơn Stripe):
  - Tạo tài khoản PayPal Developer
  - Tích hợp PayPal JavaScript SDK cơ bản
  - Chỉ cần nút "Thanh toán với PayPal" trên trang checkout
  - Xử lý callback đơn giản khi thanh toán xong
- **VNPAY Sandbox**:
  - Chỉ cấu hình thanh toán đơn giản nhất
  - Xử lý callback để cập nhật trạng thái đơn hàng

### 2. RSS Feed Integration (Bài lab 02)
- Chọn RSS Feed thay vì Twilio SMS vì đơn giản hơn
- **Cách thực hiện tối giản**:
  - Sử dụng thư viện có sẵn như 'rss-parser'
  - Lấy feed từ VNExpress (https://vnexpress.net/rss/tin-moi-nhat.rss)
  - Chỉ hiển thị 5-10 bài viết mới nhất
  - Format đơn giản: tiêu đề, ngày, link
  - Đặt ở footer hoặc sidebar của website

### 3. SEO và Sharing (Đồ án)
- **URL thân thiện**:
  - Chỉ cần đảm bảo đường dẫn sản phẩm có dạng /product/[slug]
  - Sử dụng dynamic routes của Next.js
- **Meta tags và OG tags**:
  - Cài đặt next-seo package
  - Cấu hình default SEO config
  - Tạo meta tags cho trang sản phẩm với title, description, image
  - Test share lên Facebook với Facebook Debugger
- **robots.txt & sitemap.xml**:
  - Tạo robots.txt đơn giản
  - Sử dụng next-sitemap để tạo sitemap.xml cơ bản

### 4. Live Chat Support
- **Plugin chat đơn giản**:
  - Sử dụng Tawk.to (miễn phí, dễ tích hợp)
  - Chỉ cần nhúng script vào layout
  - Không cần tùy chỉnh nhiều
- *Không cần tạo Facebook Messenger và bot phức tạp*

### 5. Email Marketing
- **Mailchimp integration cơ bản**:
  - Đăng ký tài khoản Mailchimp miễn phí
  - Tạo form đăng ký email đơn giản
  - Nhúng form vào newsletter section
  - Gửi một email test đơn giản

### 6. Google Analytics
- **Cấu hình đơn giản**:
  - Đăng ký Google Analytics
  - Nhúng script GA4 vào layout
  - Cơ bản nhất: theo dõi pageviews

