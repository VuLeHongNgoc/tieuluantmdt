
-- ENUMS
CREATE TABLE enums (
    name VARCHAR(255) PRIMARY KEY,
    value VARCHAR(255)
);

-- USERS
CREATE TABLE users (
    id CHAR(36) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    phone VARCHAR(20),
    address TEXT,
    avatar VARCHAR(255),
    role ENUM('ADMIN', 'USER') DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- CATEGORIES
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(255) NOT NULL, --1
    slug VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- BRANDS
CREATE TABLE brands (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(255) NOT NULL, --1
    logo_url VARCHAR(255), 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PRODUCTS
CREATE TABLE products (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL, --1
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,  --1   
    price DECIMAL(10,2) NOT NULL, --1   
    is_featured BOOLEAN DEFAULT FALSE,
    is_new BOOLEAN DEFAULT FALSE,
    category_id INT,  
    brand_id INT,   
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (brand_id) REFERENCES brands(id)
);

-- PRODUCT VARIANTS
CREATE TABLE product_variants (
    id CHAR(36) PRIMARY KEY,
    product_id CHAR(36),
    color VARCHAR(50), --1   
    size ENUM('XS', 'S', 'M', 'L', 'XL', 'XXL'), --1   
    stock INT DEFAULT 0,
    price_override DECIMAL(10,2),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- PRODUCT IMAGES
CREATE TABLE product_images (
    id CHAR(36) PRIMARY KEY,
    product_id CHAR(36),
    image_url VARCHAR(255), --1   (2 hình)
    alt VARCHAR(255), 
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- CARTS
CREATE TABLE carts (
    id CHAR(36) PRIMARY KEY,
    user_id CHAR(36) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- CART ITEMS
CREATE TABLE cart_items (
    id CHAR(36) PRIMARY KEY,
    cart_id CHAR(36),
    variant_id CHAR(36),
    quantity INT,
    FOREIGN KEY (cart_id) REFERENCES carts(id),
    FOREIGN KEY (variant_id) REFERENCES product_variants(id)
);

-- ORDERS
CREATE TABLE orders (
    id CHAR(36) PRIMARY KEY,
    user_id CHAR(36),
    status ENUM('PENDING', 'PREPARING', 'SHIPPING', 'DELIVERED', 'CANCELLED') DEFAULT 'PENDING',
    payment_method ENUM('MOMO', 'STRIPE', 'COD'),
    total DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- ORDER ITEMS
CREATE TABLE order_items (
    id CHAR(36) PRIMARY KEY,
    order_id CHAR(36),
    variant_id CHAR(36),
    quantity INT,
    unit_price DECIMAL(10,2),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (variant_id) REFERENCES product_variants(id)
);
