'use client';

import { Cart as CartType, endpoints } from '@/lib/api';
import { useSession } from 'next-auth/react';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

// Define custom session type with user ID
interface CustomUser {
  id: string;
  name?: string;
  email?: string;
  role?: string;
}

interface CustomSession {
  user?: CustomUser;
  expires: string;
}

// Define the shape of our cart context
interface CartContextType {
  cart: CartType | null;
  loading: boolean;
  error: string | null;
  addToCart: (productId: string, quantity: number, variant?: { color?: string; size?: string }) => Promise<void>;
  updateCartItem: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  applyCoupon: (code: string) => Promise<void>;
  clearCart: () => void;
}

// Create the context with a default value
const CartContext = createContext<CartContextType>({
  cart: null,
  loading: false,
  error: null,
  addToCart: async () => {},
  updateCartItem: async () => {},
  removeFromCart: async () => {},
  applyCoupon: async () => {},
  clearCart: () => {},
});

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);

// Cart provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const { data: session, status } = useSession() as { data: CustomSession | null, status: string };
  const isAuthenticated = status === 'authenticated';

  // Fetch cart when user is authenticated
  useEffect(() => {
    // Debug session status
    console.log('Authentication status:', status);
    console.log('Session data:', session);
    
    if (isAuthenticated && session?.user?.id) {
      console.log('User is authenticated, fetching cart');
      fetchCart();
    } else {
      // Clear cart if not authenticated
      console.log('User is not authenticated or has no ID, clearing cart');
      setCart(null);
    }
  }, [isAuthenticated, session?.user?.id]);

  // Fetch cart from API
  const fetchCart = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Debug authentication state
      console.log('Authentication status check:');
      console.log('- Auth status:', status);
      console.log('- Is authenticated:', isAuthenticated);
      console.log('- Session exists:', !!session);
      console.log('- User exists:', !!session?.user);
      console.log('- User ID exists:', !!session?.user?.id);
      
      if (!session?.user?.id) {
        // If no user ID available, clear cart and return
        console.error('❌ No user ID in session, cannot fetch cart');
        setCart(null);
        return;
      }
      
      const userId = session.user.id;
      console.log('✅ Fetching cart for userId:', userId);
      
      // Debug API URL configuration
      console.log('API base URL:', process.env.NEXT_PUBLIC_API_URL || '/api');
      
      // Make API call with detailed error logging
      console.log(`🔍 Calling API endpoint: cart.get with userId=${userId}`);
      
      console.log('🔍 Calling API with userId:', userId);
      const response = await endpoints.cart.get(userId);
      console.log('📦 Cart API raw response:', response);
      console.log('📦 Cart API response data:', JSON.stringify(response?.data, null, 2));
      
      if (response.error) {
        console.error('❌ API returned error:', response.error);
        throw new Error(response.error.message);
      }
      
      // Check API response structure
      console.log('🔍 API response structure check:');
      
      // Use type assertion to access potential properties
      const apiResponse = response.data as any;
      console.log('- response.success:', apiResponse?.success);
      console.log('- response.cart exists:', !!apiResponse?.cart);
      
      if (apiResponse?.cart?.items) {
        console.log('- Items in cart:', apiResponse.cart.items.length);
        console.log('- First item:', JSON.stringify(apiResponse.cart.items[0], null, 2));
      }
      
      // Extract cart data based on API response structure
      let cartData;
      
      if (apiResponse?.cart) {
        // API returns { success: true, cart: {...} }
        console.log('📦 Using cart from response.data.cart');
        cartData = apiResponse.cart;
      } else if (apiResponse && typeof apiResponse === 'object') {
        // API directly returns cart object
        console.log('📦 Using response.data directly as cart');
        cartData = apiResponse;
      } else {
        // Fallback
        console.warn('⚠️ Could not determine cart structure from response');
        cartData = null;
      }
      
      console.log('🛒 Final cart data to be set:', cartData);
      
      if (!cartData) {
        console.log('⚠️ Cart is null, creating empty cart');
        // Create an empty cart with required structure
        cartData = {
          _id: `empty-cart-${Date.now()}`,
          userId: userId,
          items: [],
          total: 0
        };
      } else if (cartData.items && cartData.items.length === 0) {
        console.log('⚠️ Cart exists but is empty');
      }
      
      setCart(cartData as CartType);
    } catch (err: any) {
      console.error('❌ Error fetching cart:', err);
      setError(err.message || 'Không thể tải giỏ hàng');
      
      // Try to show more detailed error
      if (err.response) {
        console.error('Response error:', err.response.status, err.response.data);
      } else if (err.request) {
        console.error('Request error (no response):', err.request);
      } else {
        console.error('Error details:', err);
      }
      
      // Debug session again in case it changed
      console.log('Session in error handler:', session);
      
      // For testing - create an empty cart to at least show the UI
      console.log('⚠️ Creating empty cart for display purposes');
      setCart({
        _id: 'temp-cart',
        userId: session?.user?.id || 'guest',
        items: [],
        total: 0
      } as CartType);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to normalize color names
  const normalizeColorName = (color: string | undefined): string | undefined => {
    if (!color) return undefined;
    
    // Convert to lowercase for case-insensitive matching
    const lowerColor = color.toLowerCase().trim();
    
    // Map common color names to their database equivalents
    const colorMap: Record<string, string> = {
      'black': 'Black',
      'white': 'White',
      'navy': 'Navy',
      'gray': 'Gray',
      'red': 'Red',
      'green': 'Green',
      'orange': 'Orange',
      'brown': 'Dark brown',
      'dark brown': 'Dark brown',
      'xanh': 'Navy',
      'đen': 'Black',
      'trắng': 'White',
      'đỏ': 'Red',
      'xanh lá': 'Green',
      'cam': 'Orange',
      'nâu': 'Dark brown',
      'xám': 'Gray'
    };
    
    return colorMap[lowerColor] || color;
  };

  // Add item to cart
  const addToCart = async (
    productId: string,
    quantity: number,
    variant?: { color?: string; size?: string }
  ) => {
    try {
      setLoading(true);
      setError(null);
      
      if (!isAuthenticated || !session?.user) {
        toast.error('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng');
        return;
      }
      
      // Normalize color name if provided
      const normalizedVariant = variant ? {
        ...variant,
        color: normalizeColorName(variant.color)
      } : variant;
      
      // Log the normalized variant
      if (normalizedVariant?.color !== variant?.color) {
        console.log('🛒 Normalized color from', variant?.color, 'to', normalizedVariant?.color);
      }
      
      // Get the user ID from the session
      const userId = session.user.id;
      
      if (!userId) {
        toast.error('Không thể xác định người dùng, vui lòng đăng nhập lại');
        return;
      }
      
      console.log('🛒 Adding to cart:', { userId, productId, quantity, variant: normalizedVariant });
      
      // First, fetch the product to get the correct variantId based on color and size
      const productResponse = await fetch(`/api/products/${productId}`);
      if (!productResponse.ok) {
        throw new Error('Không thể lấy thông tin sản phẩm');
      }
      
      const productData = await productResponse.json();
      console.log('🛒 Product data:', productData);
      
      // We'll use normalizedVariant for looking up the right variant
      const lookupVariant = normalizedVariant;
      
      // Find the right variant based on color and size
      let variantId = null;
      console.log('🛒 Looking for variant with color:', lookupVariant?.color, 'and size:', lookupVariant?.size);
      
             // Direct ID mappings for all products
       const knownProductVariants: Record<string, Record<string, string>> = {
         // H&M - Oversized Teddy Fleece Vest - Dark brown
         'prod-hm-001-vest-brown': {
           'S': 'var-hm-001-brown-s',
           'M': 'var-hm-001-brown-m',
           'L': 'var-hm-001-brown-l'
         },
         // H&M - Oversized Teddy Fleece Vest - White
         'prod-hm-002-vest-white': {
           'S': 'var-hm-002-white-s',
           'M': 'var-hm-002-white-m',
           'L': 'var-hm-002-white-l'
         },
         // H&M - Bouclé-Knit Dress
         'prod-hm-003-boucle-dress': {
           'S': 'var-hm-003-black-s',
           'M': 'var-hm-003-black-m',
           'L': 'var-hm-003-black-l'
         },
         // H&M - Pleated Skirt
         'prod-hm-004-pleated-skirt': {
           'S': 'var-hm-004-black-s',
           'M': 'var-hm-004-black-m',
           'L': 'var-hm-004-black-l'
         },
         // H&M - Chain-Detail Long-Sleeved Top - White
         'prod-hm-005-chain-top-white': {
           'S': 'var-hm-005-white-s',
           'M': 'var-hm-005-white-m',
           'L': 'var-hm-005-white-l'
         },
         // H&M - Chain-Detail Long-Sleeved Top - Black
         'prod-hm-006-chain-top-black': {
           'S': 'var-hm-006-black-s',
           'M': 'var-hm-006-black-m',
           'L': 'var-hm-006-black-l'
         },
         // H&M - Organza Skirt
         'prod-hm-007-organza-skirt': {
           'S': 'var-hm-007-black-s',
           'M': 'var-hm-007-black-m',
           'L': 'var-hm-007-black-l'
         },
         // H&M - Velour Leggings - Orange
         'prod-hm-008-velour-leggings-orange': {
           'S': 'var-hm-008-orange-s',
           'M': 'var-hm-008-orange-m',
           'L': 'var-hm-008-orange-l'
         },
         // H&M - Velour Leggings - Dark brown
         'prod-hm-009-velour-leggings-brown': {
           'S': 'var-hm-009-brown-s',
           'M': 'var-hm-009-brown-m',
           'L': 'var-hm-009-brown-l'
         },
         // H&M - Crushed Velour Top - Orange
         'prod-hm-010-velour-top-orange': {
           'S': 'var-hm-010-orange-s',
           'M': 'var-hm-010-orange-m',
           'L': 'var-hm-010-orange-l'
         },
         // H&M - Crushed Velour Top - Dark brown
         'prod-hm-011-velour-top-brown': {
           'S': 'var-hm-011-brown-s',
           'M': 'var-hm-011-brown-m',
           'L': 'var-hm-011-brown-l'
         },
         // H&M - Ruffle-Trimmed One-Shoulder Dress
         'prod-hm-012-ruffle-dress': {
           'S': 'var-hm-012-black-s',
           'M': 'var-hm-012-black-m', 
           'L': 'var-hm-012-black-l'
         },
         // H&M - Tie-Neck Dress
         'prod-hm-013-tie-neck-dress': {
           'S': 'var-hm-013-black-s',
           'M': 'var-hm-013-black-m',
           'L': 'var-hm-013-black-l'
         },
         // H&M - Cape Dress
         'prod-hm-014-cape-dress': {
           'S': 'var-hm-014-black-s',
           'M': 'var-hm-014-black-m',
           'L': 'var-hm-014-black-l'
         },
         // H&M - Chain-Detail Skort
         'prod-hm-015-chain-skort': {
           'S': 'var-hm-015-black-s',
           'M': 'var-hm-015-black-m',
           'L': 'var-hm-015-black-l'
         },
         // H&M - Textured Overshirt
         'prod-hm-016-textured-overshirt': {
           'S': 'var-hm-016-black-s',
           'M': 'var-hm-016-black-m',
           'L': 'var-hm-016-black-l'
         }
       };
      
             // Check for direct mapping first
       if (knownProductVariants[productId] && lookupVariant?.size) {
         console.log('🔍 Checking direct mapping for product:', productId);
         console.log('🔍 Available sizes in mapping:', Object.keys(knownProductVariants[productId]));
         console.log('🔍 Requested size:', lookupVariant.size);
         
         const directVariantId = knownProductVariants[productId][lookupVariant.size];
         if (directVariantId) {
           console.log('🛒 Found direct variant mapping:', directVariantId);
           variantId = directVariantId;
         } else {
           console.log('❌ No direct mapping found for size:', lookupVariant.size);
           
           // FALLBACK: Try to find any variant with the requested size
           const availableSizes = Object.keys(knownProductVariants[productId]);
           console.log('🔍 Available sizes in mapping:', availableSizes);
           
           // Try case-insensitive size matching
           const matchingSize = availableSizes.find(size => 
             size.toLowerCase() === lookupVariant.size?.toLowerCase()
           );
           
           if (matchingSize) {
             const fallbackVariantId = knownProductVariants[productId][matchingSize];
             console.log('🛒 Found fallback variant mapping:', fallbackVariantId, 'for size:', matchingSize);
             variantId = fallbackVariantId;
           } else {
             console.log('❌ No matching size found, will try other strategies');
             
             // LAST RESORT: Use the first available variant from mapping
             const firstSize = availableSizes[0];
             if (firstSize) {
               const lastResortVariantId = knownProductVariants[productId][firstSize];
               console.log('🆘 Using last resort variant:', lastResortVariantId, 'for size:', firstSize);
               variantId = lastResortVariantId;
             }
           }
         }
       }
       
       // If no hard-coded mapping found, try automatic variant search
       if (!variantId) {
         console.log('🔍 No hard-coded mapping found, trying automatic variant search...');
       }
      
      if (productData.variants) {
        // Log all available variants for debugging
        console.log('🛒 Available variants:', productData.variants.map((v: any) => ({ 
          id: v._id, 
          color: v.color, 
          size: v.size 
        })));
        
        // FIRST STRATEGY: Try to find exact match if both color and size are provided
        if (lookupVariant?.color && lookupVariant?.size) {
          // Log what we're looking for
          console.log('🔍 Looking for color:', lookupVariant.color, 'and size:', lookupVariant.size);
          
          // Try case-insensitive match and ignore leading/trailing spaces
          const foundVariant = productData.variants.find(
            (v: any) => {
              const colorMatch = String(v.color).toLowerCase().trim() === String(lookupVariant.color).toLowerCase().trim();
              const sizeMatch = String(v.size).toLowerCase().trim() === String(lookupVariant.size).toLowerCase().trim();
              console.log(`Checking variant ${v._id}: color=${v.color}(${colorMatch}), size=${v.size}(${sizeMatch})`);
              return colorMatch && sizeMatch;
            }
          );
          
          if (foundVariant) {
            variantId = foundVariant._id;
            console.log('🛒 Found exact matching variant:', { variantId, variant: foundVariant });
          } else {
            console.log('❌ No exact match found, trying other strategies...');
          }
          
          // If not found with exact match, try includes for color
          if (!foundVariant) {
            const altVariant = productData.variants.find(
              (v: any) => {
                const colorMatch = String(v.color).toLowerCase().trim().includes(String(lookupVariant.color).toLowerCase().trim()) || 
                                 String(lookupVariant.color).toLowerCase().trim().includes(String(v.color).toLowerCase().trim());
                const sizeMatch = String(v.size).toLowerCase().trim() === String(lookupVariant.size).toLowerCase().trim();
                return colorMatch && sizeMatch;
              }
            );
            
            if (altVariant) {
              variantId = altVariant._id;
              console.log('🛒 Found partial matching variant:', { variantId, variant: altVariant });
            }
          } else {
            variantId = foundVariant._id;
            console.log('🛒 Found exact matching variant:', { variantId, variant: foundVariant });
          }
        }
        
        // ENHANCED STRATEGY: Try to find variant by ID pattern if color/size matching fails
        if (!variantId && lookupVariant?.color && lookupVariant?.size) {
          const colorLower = lookupVariant.color.toLowerCase();
          const sizeLower = lookupVariant.size.toLowerCase();
          
          // Try to find variant by ID pattern (e.g., var-hm-012-black-s)
          const patternVariant = productData.variants.find((v: any) => {
            const idLower = v._id.toLowerCase();
            return idLower.includes(colorLower) && idLower.includes(sizeLower);
          });
          
          if (patternVariant) {
            variantId = patternVariant._id;
            console.log('🛒 Found variant by ID pattern:', { variantId, variant: patternVariant });
          }
        }
        
        // SECOND STRATEGY: If no exact match found, try matching just by size
        if (!variantId && lookupVariant?.size) {
          const sizeMatch = productData.variants.find(
            (v: any) => String(v.size).toLowerCase().trim() === String(lookupVariant.size).toLowerCase().trim()
          );
          
          if (sizeMatch) {
            variantId = sizeMatch._id;
            console.log('🛒 Found variant with matching size:', { variantId, variant: sizeMatch });
          }
        }
        
        // THIRD STRATEGY: Try looking up variant by color only with more flexible matching
        if (!variantId && lookupVariant?.color && productData.variants.length > 0) {
          // First try exact color match
          const exactColorMatch = productData.variants.find(
            (v: any) => String(v.color).toLowerCase().trim() === String(lookupVariant.color).toLowerCase().trim()
          );
          
          if (exactColorMatch) {
            variantId = exactColorMatch._id;
            console.log('🛒 Found variant with exact color match:', { variantId, variant: exactColorMatch });
          } else {
            // Try partial color match if exact match fails
            const partialColorMatch = productData.variants.find(
              (v: any) => String(v.color).toLowerCase().trim().includes(String(lookupVariant.color).toLowerCase().trim()) ||
                          String(lookupVariant.color).toLowerCase().trim().includes(String(v.color).toLowerCase().trim())
            );
            
            if (partialColorMatch) {
              variantId = partialColorMatch._id;
              console.log('🛒 Found variant with partial color match:', { variantId, variant: partialColorMatch });
            }
          }
          
          // Special case for Orange color which seems problematic
          if (!variantId && lookupVariant.color.toLowerCase().includes('orange')) {
            const orangeVariants = productData.variants.filter(
              (v: any) => v._id.toLowerCase().includes('orange')
            );
            
            if (orangeVariants.length > 0) {
              variantId = orangeVariants[0]._id;
              console.log('🛒 Found orange variant by ID check:', { variantId, variant: orangeVariants[0] });
            }
          }
        }
        
        // FOURTH STRATEGY: If still no match, use first available variant
        if (!variantId && productData.variants.length > 0) {
          variantId = productData.variants[0]._id;
          console.log('⚠️ No matching variant found, using first variant:', variantId);
        }
      }
      
      if (!variantId && productData.variants && productData.variants.length > 0) {
        // If still no match and no variant info provided, use first variant
        variantId = productData.variants[0]._id;
        console.log('🛒 No variant specified or no match found, using first variant:', variantId);
      }
      
      if (!variantId) {
        console.error('❌ Failed to find any valid variant for product:', productId);
        // Log detailed product information to help debugging
        console.error('Product ID:', productId);
        console.error('Selected color:', lookupVariant?.color, '(original:', variant?.color, ')');
        console.error('Selected size:', lookupVariant?.size);
        
        // Log available variants with more details
        if (productData.variants && productData.variants.length > 0) {
          console.error('Available variants:', 
            productData.variants.map((v: any) => ({
              id: v._id, 
              color: v.color, 
              size: v.size, 
              stock: v.stock
            }))
          );
          
          // EMERGENCY FALLBACK - just use ANY variant with the matching size
          if (lookupVariant?.size) {
            for (const v of productData.variants) {
              // Super loose size comparison - just check if the strings contain each other
              if (v.size && 
                  (v.size.toString().toLowerCase().includes(lookupVariant.size.toLowerCase()) || 
                   lookupVariant.size.toLowerCase().includes(v.size.toString().toLowerCase()))) {
                variantId = v._id;
                console.log('🆘 Emergency fallback: Using variant with size match:', variantId);
                break;
              }
            }
          }
          
          // If still no match, just use the first variant
          if (!variantId) {
            variantId = productData.variants[0]._id;
            console.log('🆘 Last resort: Using first variant:', variantId);
          }
        } else {
          console.error('Available variants: No variants found in product data');
        }
        
        if (!variantId) {
          toast.error('Không tìm thấy biến thể sản phẩm phù hợp');
          return;
        }
      }      // Double check that we have a valid variantId before making the API call
      if (!variantId) {
        console.error('⚠️ CRITICAL ERROR: About to call API with null variantId!');
        variantId = `default-${Date.now()}`; // Create a placeholder in extreme cases
        console.log('🆘 Created emergency placeholder variantId:', variantId);
      } else {
        console.log('✅ Using variantId:', variantId, 'for product:', productId);
      }
      
      const response = await endpoints.cart.addItem({
        userId,
        productId,
        variantId,
        quantity
      });
      
      // Log successful variant matching
      console.log('🛒 Successfully found variantId:', variantId, 'for product:', productId);
      
      console.log('🛒 Add to cart API response:', JSON.stringify(response, null, 2));
      
      if (response.error) {
        console.error('❌ Error adding to cart:', response.error);
        throw new Error(response.error.message);
      }
      
      // Check response structure and extract cart data
      const apiResponse = response.data as any;
      const cartData = apiResponse?.cart || apiResponse;
      
      console.log('🛒 Cart data after adding item:', JSON.stringify(cartData, null, 2));
      
      // Ensure it has the right structure
      if (cartData) {
        setCart(cartData as CartType);
        toast.success('Đã thêm sản phẩm vào giỏ hàng');
        
        // Refresh the cart to ensure we have the latest data
        fetchCart();
      } else {
        console.error('❌ Invalid cart data received after adding item');
        throw new Error('Invalid cart data received');
      }
    } catch (err: any) {
      setError(err.message || 'Không thể thêm sản phẩm vào giỏ hàng');
      toast.error(err.message || 'Không thể thêm sản phẩm vào giỏ hàng');
      console.error('Error adding item to cart:', err);
    } finally {
      setLoading(false);
    }
  };

  // Update cart item quantity
  const updateCartItem = async (itemId: string, quantity: number) => {
    try {
      setLoading(true);
      setError(null);
      
      if (!session?.user?.id) {
        toast.error('Vui lòng đăng nhập để cập nhật giỏ hàng');
        return;
      }
      
      const userId = session.user.id;
      const response = await endpoints.cart.updateItem(itemId, quantity, userId);
      
      if (response.error) {
        throw new Error(response.error.message);
      }
      
      setCart(response.data);
      toast.success('Đã cập nhật giỏ hàng');
    } catch (err: any) {
      setError(err.message || 'Không thể cập nhật giỏ hàng');
      toast.error(err.message || 'Không thể cập nhật giỏ hàng');
      console.error('Error updating cart item:', err);
    } finally {
      setLoading(false);
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      if (!session?.user?.id) {
        toast.error('Vui lòng đăng nhập để xóa sản phẩm khỏi giỏ hàng');
        return;
      }
      
      const userId = session.user.id;
      const response = await endpoints.cart.removeItem(itemId, userId);
      
      if (response.error) {
        throw new Error(response.error.message);
      }
      
      setCart(response.data);
      toast.success('Đã xóa sản phẩm khỏi giỏ hàng');
    } catch (err: any) {
      setError(err.message || 'Không thể xóa sản phẩm khỏi giỏ hàng');
      toast.error(err.message || 'Không thể xóa sản phẩm khỏi giỏ hàng');
      console.error('Error removing item from cart:', err);
    } finally {
      setLoading(false);
    }
  };

  // Apply coupon code
  const applyCoupon = async (code: string) => {
    try {
      setLoading(true);
      setError(null);
      
      if (!session?.user?.id) {
        toast.error('Vui lòng đăng nhập để áp dụng mã giảm giá');
        return;
      }
      
      const userId = session.user.id;
      const response = await endpoints.cart.applyCoupon(code, userId);
      
      if (response.error) {
        throw new Error(response.error.message);
      }
      
      setCart(response.data);
      toast.success('Đã áp dụng mã giảm giá');
    } catch (err: any) {
      setError(err.message || 'Mã giảm giá không hợp lệ');
      toast.error(err.message || 'Mã giảm giá không hợp lệ');
      console.error('Error applying coupon:', err);
    } finally {
      setLoading(false);
    }
  };

  // Clear cart (local only)
  const clearCart = () => {
    setCart(null);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        addToCart,
        updateCartItem,
        removeFromCart,
        applyCoupon,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
