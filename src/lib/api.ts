/**
 * API Client Service
 * 
 * Centralized utili      // Get current session for auth token
      try {
        const session = await getSession();
        // Cast session to extended session type
        const extendedSession = session as ExtendedSession;
        if (extendedSession?.accessToken) {
          headers['Authorization'] = `Bearer ${extendedSession.accessToken}`;
        }
      } catch (sessionError) {
        // Continue without auth token if session can't be retrieved
        console.warn('Failed to get session for API request:', sessionError);
      }ing API calls to backend services.
 * Features:
 * - Type-safe API endpoints
 * - Error handling
 * - Authentication integration with NextAuth.js
 * - Loading state management
 */

import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';

// Extended session type with access token
interface ExtendedSession extends Session {
  accessToken?: string;
}

// Basic API response type
export type ApiResponse<T = any> = {
  data: T | null;
  error: ApiError | null;
  status: number;
};

// Error type
export type ApiError = {
  code: string;
  message: string;
  details?: any;
};

// Configuration
// Ensure we don't have duplicate /api/ prefixes
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';
console.log(`API_BASE_URL: ${API_BASE_URL}`);

/**
 * Core API Client class
 * Handles all API requests with consistent error handling and auth
 */
class ApiClient {
  /**
   * Base request method
   * @param endpoint API endpoint (without base URL)
   * @param options fetch options
   * @returns ApiResponse with data or error
   */
  async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      // Avoid duplicate /api/ in URL
      // If endpoint already contains /api/, remove /api/ from base URL
      const baseUrl = endpoint.startsWith('/api/') ? '' : API_BASE_URL;
      
      // Add base URL - ensure there's a slash between base URL and endpoint
      const url = endpoint.startsWith('/') ? 
        `${baseUrl}${endpoint}` : 
        `${baseUrl}/${endpoint}`;
      
      console.log(`Making API request to: ${url}`);
      
      // Default headers
      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(options.headers || {}),
      } as Record<string, string>;
      
      // Get current session for auth token (if available)
      try {
        const session = await getSession();
        // Cast session to extended session type
        const extendedSession = session as ExtendedSession;
        if (extendedSession?.accessToken) {
          headers['Authorization'] = `Bearer ${extendedSession.accessToken}`;
        }
      } catch (sessionError) {
        // Continue without auth token if session can't be retrieved
        console.warn('Failed to get session for API request:', sessionError);
      }
      
      // Make the request
      const response = await fetch(url, {
        ...options,
        headers,
      });
      
      // Handle response
      const status = response.status;
      
      // Parse JSON response if available
      let data = null;
      let error = null;
      
      if (response.headers.get('Content-Type')?.includes('application/json')) {
        const json = await response.json();
        
        if (response.ok) {
          data = json;
        } else {
          error = {
            code: json.code || `ERROR_${status}`,
            message: json.message || 'An error occurred',
            details: json.details,
          };
        }
      } else if (!response.ok) {
        error = {
          code: `ERROR_${status}`,
          message: response.statusText || 'An error occurred',
        };
      }
      
      return { data, error, status };
    } catch (err) {
      return {
        data: null,
        error: {
          code: 'NETWORK_ERROR',
          message: err instanceof Error ? err.message : 'Network error',
        },
        status: 0,
      };
    }
  }
  
  /**
   * GET request
   * @param endpoint API endpoint
   * @param queryParams Optional query parameters
   * @returns ApiResponse
   */
  async get<T>(endpoint: string, queryParams?: Record<string, string>): Promise<ApiResponse<T>> {
    const url = queryParams ? `${endpoint}?${new URLSearchParams(queryParams)}` : endpoint;
    return this.request<T>(url, { method: 'GET' });
  }
  
  /**
   * POST request
   * @param endpoint API endpoint
   * @param data Request body data
   * @returns ApiResponse
   */
  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }
  
  /**
   * PUT request
   * @param endpoint API endpoint
   * @param data Request body data
   * @returns ApiResponse
   */
  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }
  
  /**
   * DELETE request
   * @param endpoint API endpoint
   * @returns ApiResponse
   */
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
  
  /**
   * File upload using multipart/form-data
   * @param endpoint API endpoint
   * @param file File to upload
   * @param additionalData Additional form data
   * @returns ApiResponse
   */
  async uploadFile<T>(endpoint: string, file: File, additionalData?: Record<string, any>): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);
    
    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
    }
    
    return this.request<T>(endpoint, {
      method: 'POST',
      body: formData,
      headers: {}, // Browser will set correct Content-Type for multipart/form-data
    });
  }
}

// Create singleton instance
export const api = new ApiClient();

/**
 * Type definitions for API endpoints
 * These provide better type safety and IDE autocomplete
 */

// Product types
export type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  images: {
    _id: string;
    imageUrl: string;
    alt?: string;
  }[];
  category: string;
  brand: string;
  isNew?: boolean;
  isHot?: boolean;
  rating?: number;
  stock: number;
  variants?: {
    color?: string[];
    size?: string[];
  }
};

export type Category = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  image?: string;
};

export type Brand = {
  _id: string;
  name: string;
  slug: string;
  logo?: string;
};

export type CartItem = {
  _id: string;
  product: Product;
  quantity: number;
  variant?: {
    color?: string;
    size?: string;
  };
};

export type Cart = {
  _id: string;
  userId: string;
  items: CartItem[];
  couponCode?: string;
  discount?: number;
  total: number;
};

export type Order = {
  _id: string;
  userId: string;
  items: CartItem[];
  status: 'pending' | 'processing' | 'shipping' | 'delivered' | 'cancelled';
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  paymentResult?: {
    id: string;
    status: string;
    updateTime: string;
  };
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  image?: string;
};

/**
 * Typed API endpoints for better IDE support
 */
export const endpoints = {
  // Product endpoints
  products: {
    getAll: (params?: { page?: number, limit?: number, category?: string, search?: string, sort?: string }) => 
      api.get<{ products: Product[], total: number, page: number, pages: number }>('/products', params as Record<string, string>),
    getById: (id: string) => 
      api.get<Product>(`/products/${id}`),
    getFeatured: () => 
      api.get<Product[]>('/products/featured'),
    create: (data: Omit<Product, '_id'>) => 
      api.post<Product>('/products', data),
    update: (id: string, data: Partial<Product>) => 
      api.put<Product>(`/products/${id}`, data),
    delete: (id: string) => 
      api.delete<{ success: boolean }>(`/products/${id}`),
  },
  
  // Category endpoints
  categories: {
    getAll: () => 
      api.get<Category[]>('/categories'),
    getById: (id: string) => 
      api.get<Category & { products: Product[] }>(`/categories/${id}`),
    create: (data: Omit<Category, '_id'>) => 
      api.post<Category>('/categories', data),
    update: (id: string, data: Partial<Category>) => 
      api.put<Category>(`/categories/${id}`, data),
    delete: (id: string) => 
      api.delete<{ success: boolean }>(`/categories/${id}`),
  },
  
  // Brand endpoints
  brands: {
    getAll: () => 
      api.get<Brand[]>('/brands'),
  },
  
  // Cart endpoints
  cart: {
    get: (userId: string) => 
      api.get<Cart>(`/cart?userId=${userId}`),
    addItem: (data: { userId: string, productId: string, quantity: number, variantId?: string, variant?: { color?: string, size?: string } }) => 
      api.post<Cart>('/cart/items', data),
    updateItem: (itemId: string, quantity: number, userId: string) => 
      api.put<Cart>(`/cart/items/${itemId}`, { quantity, userId }),
    removeItem: (itemId: string, userId: string) => 
      api.delete<Cart>(`/cart/items/${itemId}?userId=${userId}`),
    applyCoupon: (code: string, userId: string) => 
      api.post<Cart>('/cart/coupon', { code, userId }),
  },
  
  // Order endpoints
  orders: {
    getAll: () => 
      api.get<Order[]>('/orders'),
    getById: (id: string) => 
      api.get<Order>(`/orders/${id}`),
    create: (data: { shippingAddress: any, paymentMethod: string }) => 
      api.post<Order>('/orders', data),
    updateStatus: (id: string, status: Order['status']) => 
      api.put<Order>(`/orders/${id}/status`, { status }),
    getStats: () => 
      api.get<{ total: number, pending: number, delivered: number }>('/orders/stats'),
  },
  
  // User endpoints
  users: {
    getProfile: () => 
      api.get<User>('/users/profile'),
    updateProfile: (data: Partial<User>) => 
      api.put<User>('/users/profile', data),
    getAll: () => 
      api.get<User[]>('/users'),
    getById: (id: string) => 
      api.get<User>(`/users/${id}`),
    update: (id: string, data: Partial<User>) => 
      api.put<User>(`/users/${id}`, data),
  },
};
