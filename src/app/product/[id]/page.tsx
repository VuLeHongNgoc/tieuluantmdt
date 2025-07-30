import { Product } from '@/lib/api';
import { notFound } from 'next/navigation';
import ProductDetail from '../../../components/product/ProductDetail';
import ProductTabs from '../../../components/product/ProductTabs';
import RelatedProducts from '../../../components/product/RelatedProducts';
import BreadcrumbMinimal from '../../../components/ui/BreadcrumbMinimal';

// This enables dynamic rendering at request time
export const dynamic = 'force-dynamic';

// Get product data from API
async function getProduct(id: string) {
  try {
    // Create a proper absolute URL for the API endpoint
    // For server components, we should use the absolute URL
    const baseUrl = process.env.NEXTAUTH_URL || process.env.VERCEL_URL || 'http://localhost:3000';
    const apiUrl = new URL(`/api/products/${id}`, baseUrl);
    
    console.log(`Fetching product from ${apiUrl.toString()}`);
    const response = await fetch(apiUrl.toString(), {
      cache: 'no-store' // Don't cache to ensure we get fresh data
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        console.log(`Product not found with ID: ${id}`);
        return null;
      }
      
      // Try to get more details from the error response
      try {
        const errorData = await response.json();
        throw new Error(`Failed to fetch product: ${response.statusText}, Details: ${JSON.stringify(errorData)}`);
      } catch (parseError) {
        throw new Error(`Failed to fetch product: ${response.statusText}, Status: ${response.status}`);
      }
    }

    const data = await response.json();
    
    // Check if the product data is nested in a 'product' property (as per your API design)
    const productData = data.product || data;
    
    console.log(`Successfully fetched product: ${id}, Name: ${productData?.name || 'unknown'}`);
    return productData;
    
    return data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}

// Get related products based on category
async function getRelatedProducts(categoryId: string | number | any, currentProductId: string) {
  try {
    // Create a proper absolute URL for the API endpoint
    const baseUrl = process.env.NEXTAUTH_URL || process.env.VERCEL_URL || 'http://localhost:3000';
    const apiUrl = new URL(`/api/products`, baseUrl);
    
    // Handle different category formats
    if (typeof categoryId === 'object' && categoryId !== null) {
      // If category is an object, use its ID
      apiUrl.searchParams.append('category', categoryId._id.toString());
    } else {
      // Otherwise use as is
      apiUrl.searchParams.append('category', categoryId.toString());
    }
    
    apiUrl.searchParams.append('limit', '4');
    
    console.log(`Fetching related products from: ${apiUrl.toString()}`);
    const response = await fetch(apiUrl.toString(), { cache: 'no-store' });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch related products: ${response.statusText}`);
    }

    const data = await response.json();
    // Filter out current product from related products
    return data.products.filter((product: Product) => product._id !== currentProductId);
  } catch (error) {
    console.error('Error fetching related products:', error);
    return [];
  }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  // In Next.js App Router, we should await dynamic params
  const { id } = await params;
  
  // Fetch product data from API
  const product = await getProduct(id);
  
  // If product not found, return 404
  if (!product) {
    notFound();
  }
  
  // Add logging to debug the structure of the product data
  console.log('Product data structure:', JSON.stringify(product, null, 2).substring(0, 500) + '...');
  
  // Add additional debugging for product object
  console.log('Product category type:', typeof product.category);
  if (product.category && typeof product.category === 'object') {
    console.log('Product category keys:', Object.keys(product.category));
  }
  
  // Format product data for our components with defensive programming
  const productData = {
    id: product._id || id,
    title: product.name || 'Unknown Product',
    price: product.price || 0,
    salePrice: product.salePrice,
    rating: product.rating || 0,
    reviewCount: product.reviewCount || 0,
    description: product.description || 'No description available',
    shortDescription: product.shortDescription || (product.description ? product.description.substring(0, 100) + '...' : 'No description available'),
    colors: product.variants?.color || [],
    sizes: product.variants?.size || [],
    images: product.images && product.images.length > 0 ? product.images : [{ _id: 'placeholder', imageUrl: '/images/product/placeholder.jpg', alt: product.name || 'Product Image' }],
    category: typeof product.category === 'object' && product.category !== null ? product.category.name : (product.category || 'Uncategorized'),
    brand: typeof product.brand === 'object' && product.brand !== null ? product.brand.name : (product.brand || 'Unknown Brand'),
    sku: product.sku || (product._id ? `SKU-${product._id.toString().substring(0, 8)}` : `SKU-${id.substring(0, 8)}`),
    inStock: typeof product.stock === 'number' ? product.stock > 0 : true,
    details: {
      material: product.details?.material || 'Not specified',
      origin: product.details?.origin || 'Not specified',
      washingInstructions: product.details?.washingInstructions || 'Not specified',
      model: product.details?.model || 'Not specified'
    },
    reviews: product.reviews || []
  };

  // Fetch related products if we have a category
  let relatedProducts = product.category ? 
    await getRelatedProducts(typeof product.category === 'object' ? product.category._id : product.category, product._id) : 
    [];
  
  // Debug the structure of related products
  console.log('Related products structure:', JSON.stringify(relatedProducts.slice(0, 1), null, 2));
  
  // Deep inspect and recursively ensure no complex objects in relatedProducts
  const safeRelatedProducts = relatedProducts.map((prod: any) => {
    // Function to safely process objects to prevent React render issues
    function safifyObject(obj: any): any {
      if (!obj || typeof obj !== 'object') return obj;
      
      // Handle arrays
      if (Array.isArray(obj)) {
        return obj.map(item => safifyObject(item));
      }
      
      // Handle objects
      const result: any = {};
      for (const key in obj) {
        const value = obj[key];
        if (value && typeof value === 'object') {
          // For properties likely to be used in React rendering, extract string values
          if (key === 'category' || key === 'brand') {
            result[key] = typeof value.name === 'string' ? value.name : `[${key}]`;
          } else {
            // Recursively process nested objects
            result[key] = safifyObject(value);
          }
        } else {
          result[key] = value;
        }
      }
      return result;
    }
    
    return safifyObject(prod);
  });
  
  // Replace relatedProducts with the safe version
  relatedProducts = safeRelatedProducts;
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Process category data before rendering breadcrumbs */}
      {(() => {
        // Extract category data safely
        let categoryName = 'Category';
        let categoryId = '';
        
        if (product.category) {
          if (typeof product.category === 'object' && product.category !== null) {
            categoryName = product.category.name || 'Category';
            categoryId = product.category._id || '';
          } else if (typeof product.category === 'string') {
            categoryName = product.category;
            categoryId = product.category;
          } else {
            console.log('Unexpected category type:', typeof product.category);
          }
        }
        
        return (
          <BreadcrumbMinimal 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Shop', href: '/shop' },
              { label: categoryName, href: `/shop?category=${categoryId}` },
              { label: product.name || 'Product', href: '#', active: true }
            ]} 
          />
        );
      })()}
      
      <ProductDetail product={productData} />
      
      <div className="mt-16">
        <ProductTabs 
          description={product.description} 
          details={productData.details}
          reviews={productData.reviews}
        />
      </div>
      
      {/* Only show related products if we have any */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div className="mt-16">
          <RelatedProducts 
            products={relatedProducts.map((prod: any) => {
              // Deep clone the product to avoid modifying the original
              const processedProd = { ...prod };
              
              // Ensure category is handled properly
              if (processedProd.category) {
                if (typeof processedProd.category === 'object' && processedProd.category !== null) {
                  // Replace the entire object with just the name
                  if (processedProd.category.name !== undefined) {
                    processedProd.category = processedProd.category.name;
                  } else {
                    processedProd.category = 'Category';
                  }
                }
              } else {
                processedProd.category = 'Unknown';
              }
              
              return processedProd;
            })} 
          />
        </div>
      )}
    </div>
  );
}
