-- SAMPLE DATA FOR ECOM2 DATABASE
-- Generated on July 22, 2025

-- Clear existing data (optional - uncomment if needed)
-- DELETE FROM order_items;
-- DELETE FROM orders;
-- DELETE FROM cart_items;
-- DELETE FROM carts;
-- DELETE FROM product_images;
-- DELETE FROM product_variants;
-- DELETE FROM products;
-- DELETE FROM brands;
-- DELETE FROM categories;
-- DELETE FROM users;

-- CATEGORIES DATA
INSERT INTO categories (id, name, slug, created_at) VALUES
(1, 'Thời trang nam', 'thoi-trang-nam', NOW()),
(2, 'Thời trang nữ', 'thoi-trang-nu', NOW()),
(3, 'Giày dép', 'giay-dep', NOW()),
(4, 'Điện tử', 'dien-tu', NOW()),
(5, 'Phụ kiện', 'phu-kien', NOW()),
(6, 'Thể thao', 'the-thao', NOW()),
(7, 'Làm đẹp', 'lam-dep', NOW()),
(8, 'Gia dụng', 'gia-dung', NOW());

-- BRANDS DATA
INSERT INTO brands (id, name, logo_url, created_at) VALUES
(1, 'Nike', 'https://logos-world.net/wp-content/uploads/2020/04/Nike-Logo.png', NOW()),
(2, 'Adidas', 'https://logos-world.net/wp-content/uploads/2020/04/Adidas-Logo.png', NOW()),
(3, 'Apple', 'https://logos-world.net/wp-content/uploads/2020/04/Apple-Logo.png', NOW()),
(4, 'Samsung', 'https://logos-world.net/wp-content/uploads/2020/04/Samsung-Logo.png', NOW()),
(5, 'Zara', 'https://logos-world.net/wp-content/uploads/2020/04/Zara-Logo.png', NOW()),
(6, 'H&M', 'https://logos-world.net/wp-content/uploads/2020/04/HM-Logo.png', NOW()),
(7, 'Uniqlo', 'https://logos-world.net/wp-content/uploads/2020/04/Uniqlo-Logo.png', NOW()),
(8, 'Local Brand', NULL, NOW());

-- USERS DATA
INSERT INTO users (id, email, password, name, phone, address, avatar, role, created_at) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'admin@ecom.vn', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin User', '0901234567', 'Quận 1, TP.HCM', NULL, 'ADMIN', NOW()),
('550e8400-e29b-41d4-a716-446655440001', 'user1@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Nguyễn Văn A', '0987654321', '123 Nguyễn Huệ, Quận 1, TP.HCM', NULL, 'USER', NOW()),
('550e8400-e29b-41d4-a716-446655440002', 'user2@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Trần Thị B', '0909123456', '456 Lê Lợi, Quận 3, TP.HCM', NULL, 'USER', NOW()),
('550e8400-e29b-41d4-a716-446655440003', 'user3@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Lê Văn C', '0912345678', '789 Điện Biên Phủ, Quận 10, TP.HCM', NULL, 'USER', NOW());

-- PRODUCTS DATA
INSERT INTO products (id, name, slug, description, price, is_featured, is_new, category_id, brand_id, created_at) VALUES
-- Thời trang nam
('prod-1001-nike-tshirt-classic', 'Áo thun Nike Classic', 'ao-thun-nike-classic', 'Áo thun Nike nam chất liệu cotton cao cấp, thoáng mát, phù hợp cho hoạt động thể thao và hàng ngày.', 450000.00, TRUE, FALSE, 1, 1, NOW()),
('prod-1002-adidas-polo-sport', 'Áo polo Adidas Sport', 'ao-polo-adidas-sport', 'Áo polo Adidas nam thiết kế thể thao, chất liệu Dri-FIT thấm hút mồ hôi hiệu quả.', 650000.00, FALSE, TRUE, 1, 2, NOW()),
('prod-1003-uniqlo-shirt-formal', 'Áo sơ mi Uniqlo Formal', 'ao-so-mi-uniqlo-formal', 'Áo sơ mi nam Uniqlo dáng slim fit, chất liệu cotton pha, phù hợp cho công sở.', 550000.00, FALSE, FALSE, 1, 7, NOW()),
('prod-1004-zara-jeans-skinny', 'Quần jeans Zara Skinny', 'quan-jeans-zara-skinny', 'Quần jeans nam Zara dáng skinny, chất liệu denim cao cấp, phong cách hiện đại.', 890000.00, TRUE, FALSE, 1, 5, NOW()),

-- Thời trang nữ
('prod-2001-zara-dress-summer', 'Váy Zara Summer Collection', 'vay-zara-summer-collection', 'Váy nữ Zara thiết kế thanh lịch, chất liệu voan nhẹ, phù hợp cho mùa hè.', 750000.00, TRUE, TRUE, 2, 5, NOW()),
('prod-2002-hm-blouse-office', 'Áo blouse H&M Office', 'ao-blouse-hm-office', 'Áo blouse nữ H&M thiết kế công sở, chất liệu silk cao cấp.', 480000.00, FALSE, FALSE, 2, 6, NOW()),
('prod-2003-uniqlo-cardigan-wool', 'Áo cardigan Uniqlo Wool', 'ao-cardigan-uniqlo-wool', 'Áo cardigan nữ Uniqlo chất liệu wool mềm mại, giữ ấm tốt.', 980000.00, FALSE, TRUE, 2, 7, NOW()),
('prod-2004-local-skirt-mini', 'Chân váy mini Local Brand', 'chan-vay-mini-local-brand', 'Chân váy mini thiết kế trẻ trung, chất liệu cotton pha.', 320000.00, FALSE, FALSE, 2, 8, NOW()),

-- Giày dép
('prod-3001-nike-air-max-90', 'Nike Air Max 90', 'nike-air-max-90', 'Giày thể thao Nike Air Max 90 với công nghệ đệm khí tiên tiến, phong cách retro.', 2850000.00, TRUE, FALSE, 3, 1, NOW()),
('prod-3002-adidas-ultraboost-22', 'Adidas Ultraboost 22', 'adidas-ultraboost-22', 'Giày chạy bộ Adidas Ultraboost với công nghệ Boost, hỗ trợ vận động viên chuyên nghiệp.', 4200000.00, TRUE, TRUE, 3, 2, NOW()),
('prod-3003-local-sandals-summer', 'Sandal Local Brand Summer', 'sandal-local-brand-summer', 'Sandal nữ thiết kế đơn giản, chất liệu da tổng hợp bền đẹp.', 280000.00, FALSE, FALSE, 3, 8, NOW()),
('prod-3004-nike-air-force-1', 'Nike Air Force 1', 'nike-air-force-1', 'Giày thể thao Nike Air Force 1 phong cách classic, phù hợp mọi hoàn cảnh.', 2650000.00, FALSE, FALSE, 3, 1, NOW()),

-- Điện tử
('prod-4001-iphone-15-pro-max', 'iPhone 15 Pro Max', 'iphone-15-pro-max', 'iPhone 15 Pro Max với chip A17 Pro, camera 48MP, titanium design.', 32990000.00, TRUE, TRUE, 4, 3, NOW()),
('prod-4002-samsung-s24-ultra', 'Samsung Galaxy S24 Ultra', 'samsung-galaxy-s24-ultra', 'Samsung Galaxy S24 Ultra với S Pen, camera 200MP, AI photography.', 31990000.00, TRUE, TRUE, 4, 4, NOW()),
('prod-4003-apple-watch-9', 'Apple Watch Series 9', 'apple-watch-series-9', 'Apple Watch Series 9 với chip S9, màn hình Retina, theo dõi sức khỏe toàn diện.', 9990000.00, FALSE, TRUE, 4, 3, NOW()),
('prod-4004-samsung-buds-pro', 'Samsung Galaxy Buds Pro', 'samsung-galaxy-buds-pro', 'Tai nghe Samsung Galaxy Buds Pro với chống ồn chủ động, âm thanh Hi-Fi.', 2890000.00, FALSE, FALSE, 4, 4, NOW()),

-- Phụ kiện
('prod-5001-nike-backpack-sport', 'Balo Nike Sport', 'balo-nike-sport', 'Balo Nike thiết kế thể thao, nhiều ngăn tiện dụng, chất liệu chống nước.', 980000.00, FALSE, FALSE, 5, 1, NOW()),
('prod-5002-local-wallet-leather', 'Ví da Local Brand', 'vi-da-local-brand', 'Ví da nam cao cấp, thiết kế thanh lịch, nhiều ngăn đựng thẻ.', 450000.00, FALSE, FALSE, 5, 8, NOW()),
('prod-5003-apple-magsafe-charger', 'Apple MagSafe Charger', 'apple-magsafe-charger', 'Sạc không dây Apple MagSafe với công suất 15W, tương thích iPhone 12+.', 1290000.00, FALSE, TRUE, 5, 3, NOW()),

-- Thể thao
('prod-6001-nike-dri-fit-shorts', 'Quần short Nike Dri-FIT', 'quan-short-nike-dri-fit', 'Quần short thể thao Nike với công nghệ Dri-FIT, thoáng mát khi vận động.', 420000.00, FALSE, FALSE, 6, 1, NOW()),
('prod-6002-adidas-yoga-mat', 'Thảm yoga Adidas', 'tham-yoga-adidas', 'Thảm yoga Adidas chất liệu cao su tự nhiên, chống trượt, dày 6mm.', 890000.00, FALSE, TRUE, 6, 2, NOW()),

-- Làm đẹp
('prod-7001-local-moisturizer', 'Kem dưỡng ẩm Local Brand', 'kem-duong-am-local-brand', 'Kem dưỡng ẩm với thành phần tự nhiên, phù hợp mọi loại da.', 180000.00, FALSE, FALSE, 7, 8, NOW()),
('prod-7002-local-sunscreen-spf50', 'Kem chống nắng SPF50', 'kem-chong-nang-spf50', 'Kem chống nắng SPF50 PA+++, bảo vệ da khỏi tia UV hiệu quả.', 220000.00, FALSE, TRUE, 7, 8, NOW()),

-- Gia dụng
('prod-8001-local-coffee-maker', 'Máy pha cà phê Local Brand', 'may-pha-ca-phe-local-brand', 'Máy pha cà phê tự động, thiết kế compact, phù hợp gia đình.', 1850000.00, FALSE, FALSE, 8, 8, NOW()),
('prod-8002-local-rice-cooker', 'Nồi cơm điện Local Brand', 'noi-com-dien-local-brand', 'Nồi cơm điện 1.5L, lòng nồi chống dính, tự động giữ ấm.', 680000.00, FALSE, FALSE, 8, 8, NOW());

-- PRODUCT VARIANTS DATA
INSERT INTO product_variants (id, product_id, color, size, stock, price_override, image_url) VALUES
-- Nike T-shirt variants
('var-1001-black-s', 'prod-1001-nike-tshirt-classic', 'Đen', 'S', 25, NULL, 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/sportswear-dri-fit-t-shirt-d0ftlq.png'),
('var-1001-black-m', 'prod-1001-nike-tshirt-classic', 'Đen', 'M', 30, NULL, 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/sportswear-dri-fit-t-shirt-d0ftlq.png'),
('var-1001-black-l', 'prod-1001-nike-tshirt-classic', 'Đen', 'L', 20, NULL, 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/sportswear-dri-fit-t-shirt-d0ftlq.png'),
('var-1001-white-s', 'prod-1001-nike-tshirt-classic', 'Trắng', 'S', 15, NULL, 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/61734ec7-dad8-40ecb6564ea7/sportswear-dri-fit-t-shirt-d0ftlq.png'),
('var-1001-white-m', 'prod-1001-nike-tshirt-classic', 'Trắng', 'M', 22, NULL, 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/61734ec7-dad8-40ecb6564ea7/sportswear-dri-fit-t-shirt-d0ftlq.png'),
('var-1001-white-l', 'prod-1001-nike-tshirt-classic', 'Trắng', 'L', 18, NULL, 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/61734ec7-dad8-40ecb6564ea7/sportswear-dri-fit-t-shirt-d0ftlq.png'),

-- Zara Dress variants
('var-2001-blue-s', 'prod-2001-zara-dress-summer', 'Xanh', 'S', 12, NULL, 'https://static.zara.net/photos///2024/V/0/1/p/6895/181/400/2/w/850/6895181400_1_1_1.jpg'),
('var-2001-blue-m', 'prod-2001-zara-dress-summer', 'Xanh', 'M', 8, NULL, 'https://static.zara.net/photos///2024/V/0/1/p/6895/181/400/2/w/850/6895181400_1_1_1.jpg'),
('var-2001-pink-s', 'prod-2001-zara-dress-summer', 'Hồng', 'S', 10, NULL, 'https://static.zara.net/photos///2024/V/0/1/p/6895/181/630/2/w/850/6895181630_1_1_1.jpg'),
('var-2001-pink-m', 'prod-2001-zara-dress-summer', 'Hồng', 'M', 6, NULL, 'https://static.zara.net/photos///2024/V/0/1/p/6895/181/630/2/w/850/6895181630_1_1_1.jpg'),

-- Nike Air Max variants
('var-3001-black-39', 'prod-3001-nike-air-max-90', 'Đen', NULL, 5, NULL, 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/zwxes8uud05rkuei1mpt/air-max-90-shoes-6n3vKB.png'),
('var-3001-black-40', 'prod-3001-nike-air-max-90', 'Đen', NULL, 8, NULL, 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/zwxes8uud05rkuei1mpt/air-max-90-shoes-6n3vKB.png'),
('var-3001-black-41', 'prod-3001-nike-air-max-90', 'Đen', NULL, 12, NULL, 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/zwxes8uud05rkuei1mpt/air-max-90-shoes-6n3vKB.png'),
('var-3001-white-39', 'prod-3001-nike-air-max-90', 'Trắng', NULL, 3, NULL, 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/1ad5ef28-a99b-4190-9dc2-724481a6eae8/air-max-90-shoes-6n3vKB.png'),
('var-3001-white-40', 'prod-3001-nike-air-max-90', 'Trắng', NULL, 6, NULL, 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/1ad5ef28-a99b-4190-9dc2-724481a6eae8/air-max-90-shoes-6n3vKB.png'),

-- iPhone variants
('var-4001-black-128gb', 'prod-4001-iphone-15-pro-max', 'Đen Titanium', NULL, 15, 32990000.00, 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-black-titanium-pdp-image-position-1a_AV1.jpg'),
('var-4001-white-128gb', 'prod-4001-iphone-15-pro-max', 'Trắng Titanium', NULL, 12, 32990000.00, 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-white-titanium-pdp-image-position-1a_AV1.jpg'),
('var-4001-blue-256gb', 'prod-4001-iphone-15-pro-max', 'Xanh Titanium', NULL, 8, 36990000.00, 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-blue-titanium-pdp-image-position-1a_AV1.jpg'),
('var-4001-natural-512gb', 'prod-4001-iphone-15-pro-max', 'Vàng Titanium', NULL, 5, 44990000.00, 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-natural-titanium-pdp-image-position-1a_AV1.jpg'),

-- Samsung Galaxy variants
('var-4002-black-256gb', 'prod-4002-samsung-s24-ultra', 'Đen', NULL, 10, 31990000.00, 'https://images.samsung.com/is/image/samsung/p6pim/vn/2401/gallery/vn-galaxy-s24-ultra-s928-sm-s928bzkqxxv-539572073'),
('var-4002-purple-256gb', 'prod-4002-samsung-s24-ultra', 'Tím', NULL, 7, 31990000.00, 'https://images.samsung.com/is/image/samsung/p6pim/vn/2401/gallery/vn-galaxy-s24-ultra-s928-sm-s928blvqxxv-539572078'),
('var-4002-gray-512gb', 'prod-4002-samsung-s24-ultra', 'Xám', NULL, 5, 36990000.00, 'https://images.samsung.com/is/image/samsung/p6pim/vn/2401/gallery/vn-galaxy-s24-ultra-s928-sm-s928bzgqxxv-539572075');

-- PRODUCT IMAGES DATA
INSERT INTO product_images (id, product_id, image_url, alt) VALUES
-- Nike T-shirt images
('img-1001-1', 'prod-1001-nike-tshirt-classic', 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/sportswear-dri-fit-t-shirt-d0ftlq.png', 'Nike Classic T-shirt - Front view'),
('img-1001-2', 'prod-1001-nike-tshirt-classic', 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/12345-back-view/sportswear-dri-fit-t-shirt-d0ftlq.png', 'Nike Classic T-shirt - Back view'),
('img-1001-3', 'prod-1001-nike-tshirt-classic', 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/12345-detail/sportswear-dri-fit-t-shirt-d0ftlq.png', 'Nike Classic T-shirt - Detail'),

-- Zara Dress images
('img-2001-1', 'prod-2001-zara-dress-summer', 'https://static.zara.net/photos///2024/V/0/1/p/6895/181/400/2/w/850/6895181400_1_1_1.jpg', 'Zara Summer Dress - Front view'),
('img-2001-2', 'prod-2001-zara-dress-summer', 'https://static.zara.net/photos///2024/V/0/1/p/6895/181/400/2/w/850/6895181400_2_1_1.jpg', 'Zara Summer Dress - Side view'),
('img-2001-3', 'prod-2001-zara-dress-summer', 'https://static.zara.net/photos///2024/V/0/1/p/6895/181/400/2/w/850/6895181400_6_1_1.jpg', 'Zara Summer Dress - Detail'),

-- Nike Air Max images
('img-3001-1', 'prod-3001-nike-air-max-90', 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/zwxes8uud05rkuei1mpt/air-max-90-shoes-6n3vKB.png', 'Nike Air Max 90 - Side view'),
('img-3001-2', 'prod-3001-nike-air-max-90', 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/12345-top/air-max-90-shoes-6n3vKB.png', 'Nike Air Max 90 - Top view'),
('img-3001-3', 'prod-3001-nike-air-max-90', 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/12345-sole/air-max-90-shoes-6n3vKB.png', 'Nike Air Max 90 - Sole view'),

-- iPhone images
('img-4001-1', 'prod-4001-iphone-15-pro-max', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-black-titanium-pdp-image-position-1a_AV1.jpg', 'iPhone 15 Pro Max - Front view'),
('img-4001-2', 'prod-4001-iphone-15-pro-max', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-black-titanium-pdp-image-position-2_AV1.jpg', 'iPhone 15 Pro Max - Back view'),
('img-4001-3', 'prod-4001-iphone-15-pro-max', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-black-titanium-pdp-image-position-3_AV1.jpg', 'iPhone 15 Pro Max - Side view'),
('img-4001-4', 'prod-4001-iphone-15-pro-max', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-camera-system_AV1.jpg', 'iPhone 15 Pro Max - Camera system');

-- CARTS DATA
INSERT INTO carts (id, user_id, created_at) VALUES
('cart-user-001', '550e8400-e29b-41d4-a716-446655440001', NOW()),
('cart-user-002', '550e8400-e29b-41d4-a716-446655440002', NOW()),
('cart-user-003', '550e8400-e29b-41d4-a716-446655440003', NOW());

-- CART ITEMS DATA
INSERT INTO cart_items (id, cart_id, variant_id, quantity) VALUES
('cart-item-001', 'cart-user-001', 'var-1001-black-m', 2),
('cart-item-002', 'cart-user-001', 'var-3001-black-40', 1),
('cart-item-003', 'cart-user-002', 'var-2001-blue-s', 1),
('cart-item-004', 'cart-user-002', 'var-4001-black-128gb', 1),
('cart-item-005', 'cart-user-003', 'var-1001-white-l', 1);

-- ORDERS DATA
INSERT INTO orders (id, user_id, status, payment_method, total, created_at) VALUES
('order-001', '550e8400-e29b-41d4-a716-446655440001', 'DELIVERED', 'MOMO', 3300000.00, DATE_SUB(NOW(), INTERVAL 7 DAY)),
('order-002', '550e8400-e29b-41d4-a716-446655440002', 'SHIPPING', 'STRIPE', 33740000.00, DATE_SUB(NOW(), INTERVAL 2 DAY)),
('order-003', '550e8400-e29b-41d4-a716-446655440003', 'PENDING', 'COD', 450000.00, NOW()),
('order-004', '550e8400-e29b-41d4-a716-446655440001', 'PREPARING', 'MOMO', 4200000.00, DATE_SUB(NOW(), INTERVAL 1 DAY));

-- ORDER ITEMS DATA
INSERT INTO order_items (id, order_id, variant_id, quantity, unit_price) VALUES
('order-item-001', 'order-001', 'var-1001-black-m', 2, 450000.00),
('order-item-002', 'order-001', 'var-3001-black-40', 1, 2850000.00),
('order-item-003', 'order-002', 'var-2001-blue-s', 1, 750000.00),
('order-item-004', 'order-002', 'var-4001-black-128gb', 1, 32990000.00),
('order-item-005', 'order-003', 'var-1001-white-l', 1, 450000.00),
('order-item-006', 'order-004', 'var-3002-black-42', 1, 4200000.00);

-- Add more product variants for better demo
INSERT INTO product_variants (id, product_id, color, size, stock, price_override, image_url) VALUES
('var-3002-black-42', 'prod-3002-adidas-ultraboost-22', 'Đen', NULL, 8, NULL, 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fbaf991a88f04d4ca2e0af7e00f7d9e4_9366/Ultraboost_22_Shoes_Black_GZ0127_01_standard.jpg'),
('var-1002-navy-m', 'prod-1002-adidas-polo-sport', 'Xanh Navy', 'M', 15, NULL, 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/polo-shirt-navy.jpg'),
('var-1002-navy-l', 'prod-1002-adidas-polo-sport', 'Xanh Navy', 'L', 12, NULL, 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/polo-shirt-navy.jpg'),
('var-1003-white-m', 'prod-1003-uniqlo-shirt-formal', 'Trắng', 'M', 20, NULL, 'https://im.uniqlo.com/global-cms/images/c/c0/dress-shirt-white.jpg'),
('var-1003-blue-m', 'prod-1003-uniqlo-shirt-formal', 'Xanh Nhạt', 'M', 18, NULL, 'https://im.uniqlo.com/global-cms/images/c/c0/dress-shirt-blue.jpg');

-- ENUMS DATA (if needed for application logic)
INSERT INTO enums (name, value) VALUES
('ORDER_STATUS', 'PENDING'),
('ORDER_STATUS', 'PREPARING'),
('ORDER_STATUS', 'SHIPPING'),
('ORDER_STATUS', 'DELIVERED'),
('ORDER_STATUS', 'CANCELLED'),
('PAYMENT_METHOD', 'MOMO'),
('PAYMENT_METHOD', 'STRIPE'),
('PAYMENT_METHOD', 'COD'),
('USER_ROLE', 'ADMIN'),
('USER_ROLE', 'USER'),
('SIZE', 'XS'),
('SIZE', 'S'),
('SIZE', 'M'),
('SIZE', 'L'),
('SIZE', 'XL'),
('SIZE', 'XXL');

-- Summary of sample data:
-- ✅ 8 Categories (Đa dạng từ thời trang đến điện tử)
-- ✅ 8 Brands (Nike, Adidas, Apple, Samsung, Zara, H&M, Uniqlo, Local Brand)
-- ✅ 22 Products (Từ áo quần đến điện thoại, phụ kiện)
-- ✅ 25+ Product Variants (Nhiều màu sắc, size, storage)
-- ✅ 15+ Product Images (Showcase chi tiết sản phẩm)
-- ✅ 4 Users (1 Admin + 3 Users)
-- ✅ 3 Carts với items
-- ✅ 4 Orders với các trạng thái khác nhau
-- ✅ Realistic Vietnamese product names và descriptions
-- ✅ Proper pricing trong VND
-- ✅ Stock management
-- ✅ Featured & New product flags

COMMIT;
