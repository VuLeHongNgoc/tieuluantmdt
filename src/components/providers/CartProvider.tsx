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
      
      // Get the user ID from the session
      const userId = session.user.id;
      
      if (!userId) {
        toast.error('Không thể xác định người dùng, vui lòng đăng nhập lại');
        return;
      }
      
      console.log('🛒 Adding to cart:', { userId, productId, quantity, variant });
      
      const response = await endpoints.cart.addItem({
        userId,
        productId,
        quantity,
        variant
      });
      
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
