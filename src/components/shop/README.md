# 🛍️ Modern Shop Page

## ✨ Features

Tôi đã tạo một trang shop hoàn toàn mới với thiết kế hiện đại và đơn giản:

### 🎨 **Design Highlights:**
- **Clean & Modern**: Thiết kế sạch sẽ với Tailwind CSS
- **Responsive**: Hoạt động tốt trên mọi thiết bị
- **User-friendly**: Giao diện thân thiện, dễ sử dụng

### 🔧 **Functionality:**

#### **1. Product Grid (3 columns)**
- Hiển thị 9 sản phẩm với layout responsive
- Product cards với hover effects
- Badge indicators (Hot, New, Sale)
- Quick View overlay khi hover
- Add to Cart buttons

#### **2. Filtering System**
- **Categories Filter**: All, T-shirts, Bags, Sunglasses, Accessories
- **Price Range Filter**: Under 1M, 1M-3M, 3M-5M, Over 5M
- Real-time filtering without page reload

#### **3. Sorting Options**
- Name A-Z
- Price: Low to High  
- Price: High to Low
- Results count display

#### **4. Interactive Elements**
- Hover effects trên product cards
- Smooth transitions
- Loading states
- Modern button styling

### 💰 **Price Display:**
- Vietnamese currency format (VND)
- Sale prices với strikethrough
- Clear pricing hierarchy

### 📱 **Responsive Behavior:**
- **Desktop**: 3-column grid với sidebar
- **Tablet**: 2-column grid
- **Mobile**: 1-column grid với collapsible filters

### 🎯 **Mock Data:**
- 9 sample products với real product images
- Varied pricing (350K - 5.25M VND)
- Different product categories
- Badge variations

## 🚀 **Usage:**

```typescript
// Simple import trong page.tsx
import { ModernShopPage } from '@/components/shop';

export default function ShopPage() {
  return <ModernShopPage />;
}
```

## 📂 **Component Structure:**
```
src/components/shop/
├── ModernShopPage.tsx    // Main shop component
└── index.ts              // Export file
```

## 🎨 **Styling:**
- **Framework**: Tailwind CSS
- **No external dependencies** needed
- **No jQuery** hoặc template CSS conflicts
- **Pure React** với modern hooks

## 🔄 **Future Enhancements:**
- Connect to real API/database
- Shopping cart integration  
- User authentication
- Product details page
- Reviews & ratings
- Search functionality
- Infinite scroll
- Product comparison

Trang shop này hoàn toàn mới, không dựa vào template cũ, và sử dụng best practices của React/Next.js hiện đại!
