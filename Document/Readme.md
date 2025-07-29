# 🛍️ Website Thương Mại Điện Tử – Tài liệu dự án

## ✅ Stack Công Nghệ Hoàn Hảo

Dự án được xây dựng với tiêu chí đơn giản, dễ phát triển, dễ triển khai và thân thiện với các trợ lý AI như ChatGPT, Claude. Công nghệ được chọn giúp tăng tốc quá trình phát triển MVP và dễ mở rộng về sau. Dự án chỉ tính đến việc xây dựng và deploy ở mức cơ bản để phục vụ quá trình học tập nên cơ bản là một điểm bắt buộc

### 🔧 Công Nghệ Sử Dụng: Sử dụng Node v20.19.4

| Thành phần             | Công nghệ                                     | Ghi chú                                                 |
| ---------------------- | --------------------------------------------- | ------------------------------------------------------- |
| Giao diện (Frontend)   | **Next.js (React)**                           | Hỗ trợ SEO, route động, thân thiện khi chia sẻ sản phẩm |
| Backend                | **Next.js API Routes**                        | Xử lý API ngay trong project, không cần Express         |
| Styling                | **Tailwind CSS**                              | Utility-first CSS, responsive, component-friendly       |
| Cơ sở dữ liệu          | **MongoDB Atlas**                             | NoSQL linh hoạt, dễ scale, JSON-native                  |
| ODM                    | **Mongoose**                                  | Quản lý MongoDB dễ hiểu, schema validation              |
| Xác thực người dùng    | **NextAuth.js** + **MongoDB**                 | JWT-based auth, lưu session trong MongoDB               |
| Thanh toán             | **VNPAY (trong nước)** + **Stripe (quốc tế)** | Tích hợp hai cổng thanh toán linh hoạt                  |
| Báo cáo – Biểu đồ      | **Recharts** hoặc **Chart.js**                | Vẽ biểu đồ đơn giản, dễ nhúng                           |
| Hỗ trợ chat trực tuyến | **Messenger Plugin**, **Tawk.to**, **Subiz**  | Dễ nhúng vào trang, không cần backend                   |
| SEO                    | **next-seo**, custom `<Head>`                 | Tối ưu meta, OG tag, sitemap, robots.txt                |
| Marketing – Thống kê   | **Mailchimp**, **Google Analytics/Webmaster** | Theo dõi hành vi và gửi email marketing                 |
| Hosting                | **Vercel**                                    | Miễn phí giai đoạn đầu, dễ deploy                       |

---

## 🧩 Danh Sách Chức Năng

### 🔐 Đăng nhập & Phân quyền

- Đăng ký, đăng nhập (email/mật khẩu)
- Quên mật khẩu qua email, đổi mật khẩu
- Phân quyền:
  - `Admin` (R1)
  - `User` (R2)
- Cập nhật thông tin cá nhân

### 📂 Quản lý Danh mục & Sản phẩm

- Danh mục: Áo thun, Áo khoác, Quần, Giày,...
- Thương hiệu: Nike, PRADA, Gucci,...
- Phân loại kích cỡ: S, M, L, XL, XXL

### 🛍️ Sản phẩm

- CRUD sản phẩm
- Quản lý chi tiết: màu sắc, kích cỡ, giá, ảnh
- Đánh dấu sản phẩm nổi bật hoặc mới

### 📦 Quản lý Đơn hàng

- Thêm/xoá/cập nhật giỏ hàng
- Tạo đơn hàng
- Thanh toán:
  - Momo (Việt Nam)
  - Stripe (quốc tế)
- Trạng thái đơn:
  - Chờ xác nhận → Đang chuẩn bị → Đang giao → Đã giao → Đã huỷ

### 📊 Báo cáo & Thống kê

- Tổng quan doanh thu, số đơn hàng, số lượng người dùng
- Biểu đồ doanh thu theo tháng/ngày
- Thống kê theo trạng thái đơn hàng
- Thống kê lợi nhuận, tồn kho

### 💬 Hỗ trợ Trực tuyến

- Tích hợp Facebook Messenger qua FanPage
- Plugin chat: Tawk.to, Subiz, Crisp,...
- Hỗ trợ khách hàng 1:1, dễ cài đặt

### 🔎 SEO & Chia sẻ

- URL thân thiện
- Thẻ meta, OG tag (ảnh, tiêu đề, mô tả, liên kết)
- Chia sẻ Facebook hiển thị đúng preview
- Đánh giá SEO bằng công cụ SEOQuake

### ⚙️ Quản trị Website

- Email marketing với Mailchimp
- Tích hợp Google Analytics, Webmaster Tool
- Nhúng `robots.txt`, `sitemap.xml` vào host

---

## 🚀 Mục tiêus

Xây dựng một website thương mại điện tử đầy đủ tính năng, dễ sử dụng, dễ triển khai, dễ mở rộng, phù hợp với startup hoặc MVP – đồng thời thân thiện với các công cụ AI để dễ dàng phát triển và bảo trì về sau. Dự án chỉ tính đến việc xây dựng và deploy ở mức cơ bản để phục vụ quá trình học tập nên cơ bản là một điểm bắt buộc

## Danh sách các bảng cần xây dựng trong CSDL

## 🧩 Danh Sách Các trang cần xây dựng

(Đã có trong mục Frontend\Template)

- Firstpage.html - Trang chủ website
- Shop-Default - Trang sản phẩm
- Product - Trang chi tiết sản phẩm
- Our Team - Giới thiệu về team
- Contact - Liên hệ
