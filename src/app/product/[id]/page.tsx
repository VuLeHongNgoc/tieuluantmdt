// Import các component trực tiếp bằng đường dẫn tương đối
import ProductDetail from '../../../components/product/ProductDetail';
import ProductTabs from '../../../components/product/ProductTabs';
import RelatedProducts from '../../../components/product/RelatedProducts';
import BreadcrumbMinimal from '../../../components/ui/BreadcrumbMinimal';

export default function ProductPage({ params }: { params: { id: string } }) {
  // Trong một ứng dụng thực tế, chúng ta sẽ fetch dữ liệu sản phẩm từ API dựa trên params.id
  const productData = {
    id: params.id,
    title: 'Áo Thun Minimalist Typography',
    price: 390000,
    rating: 4.5,
    reviewCount: 12,
    description: 'Áo thun unisex với thiết kế minimalist, chất liệu cotton 100% mang lại cảm giác thoải mái suốt ngày dài.',
    shortDescription: 'Thiết kế đơn giản, tinh tế với typography hiện đại. Phù hợp cho mọi dịp từ đi chơi đến đi làm.',
    colors: ['black', 'white', 'navy'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      '/images/product/product-1.jpg',
      '/images/product/product-2.jpg',
      '/images/product/product-3.jpg',
    ],
    category: 'Áo thun',
    brand: 'Minimalist',
    sku: 'MINI-TS-001',
    inStock: true,
    details: {
      material: '100% cotton',
      origin: 'Việt Nam',
      washingInstructions: 'Giặt máy ở nhiệt độ thấp, không tẩy',
      model: 'Mẫu cao 1m80, nặng 70kg, mặc size L'
    },
    reviews: [
      {
        id: '1',
        user: 'Nguyễn Văn A',
        rating: 5,
        date: '2025-07-01',
        content: 'Chất vải rất tốt, form áo đẹp. Đúng như mô tả.'
      },
      {
        id: '2',
        user: 'Trần Thị B',
        rating: 4,
        date: '2025-06-28',
        content: 'Thiết kế đẹp, đơn giản, dễ phối đồ. Chỉ tiếc là màu hơi khác so với hình.'
      }
    ]
  };

  return (
    <div className="product-page-minimalist">
      {/* Breadcrumb tối giản */}
      <BreadcrumbMinimal 
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Cửa hàng', href: '/shop' },
          { label: productData.title, href: '#', active: true }
        ]} 
      />
      
      {/* Chi tiết sản phẩm */}
      <ProductDetail product={productData} />
      
      {/* Tabs thông tin sản phẩm */}
      <ProductTabs 
        description={productData.description}
        details={productData.details}
        reviews={productData.reviews}
      />
      
      {/* Sản phẩm liên quan */}
      <RelatedProducts category={productData.category} currentProductId={productData.id} />
    </div>
  );
}
