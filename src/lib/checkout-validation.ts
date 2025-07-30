/**
 * Checkout Validation Utilities
 * 
 * Functions to validate cart data before checkout
 */

import { api } from './api';

/**
 * Product variant structure
 */
export interface ProductVariant {
  id: string;
  stock: number;
  color: string;
  size?: string;
  price: number;
}

/**
 * Product structure
 */
export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  variants: ProductVariant[];
}

/**
 * Cart item structure
 */
export interface CartItem {
  _id: string;
  variantId: string;
  productId: string;
  quantity: number;
  addedAt: string;
  product?: Partial<Product>; // Extended data from product
}

/**
 * Cart data structure
 */
export interface Cart {
  _id: string;
  userId: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Error types for checkout validation
 */
export enum CheckoutValidationError {
  EMPTY_CART = 'EMPTY_CART',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
  INVALID_ITEM = 'INVALID_ITEM',
  UNAUTHORIZED = 'UNAUTHORIZED',
  CART_NOT_FOUND = 'CART_NOT_FOUND'
}

/**
 * Validation result type
 */
export interface ValidationResult {
  isValid: boolean;
  error?: CheckoutValidationError;
  errorDetails?: any;
}

/**
 * Check if user is authenticated
 */
export async function validateAuthentication(): Promise<ValidationResult> {
  try {
    // Check if user is authenticated by fetching profile
    const response = await api.get('/users/profile');
    
    if (response.error) {
      return {
        isValid: false,
        error: CheckoutValidationError.UNAUTHORIZED,
        errorDetails: response.error
      };
    }
    
    return { isValid: true };
  } catch (error) {
    return {
      isValid: false,
      error: CheckoutValidationError.UNAUTHORIZED,
      errorDetails: error
    };
  }
}

/**
 * Validate cart data before checkout
 */
export async function validateCart(): Promise<ValidationResult> {
  try {
    // Fetch current cart
    const cartResponse = await api.get<Cart>('/cart');
    
    if (cartResponse.error) {
      return {
        isValid: false,
        error: CheckoutValidationError.CART_NOT_FOUND,
        errorDetails: cartResponse.error
      };
    }
    
    const cart = cartResponse.data;
    
    // Check if cart is empty
    if (!cart || !cart.items || cart.items.length === 0) {
      return {
        isValid: false,
        error: CheckoutValidationError.EMPTY_CART
      };
    }
    
    // Check if all items are in stock
    // This requires fetching product data for each item
    const outOfStockItems = [];
    
    // For production code, use batch API request to check stock for all items at once
    // This example does it item by item for simplicity
    for (const item of cart.items) {
      const productResponse = await api.get<Product>(`/products/${item.productId}`);
      
      if (productResponse.error || !productResponse.data) {
        outOfStockItems.push({
          ...item,
          reason: 'Product not found'
        });
        continue;
      }
      
      const product: Product = productResponse.data;
      
      // Find the specific variant
      const variant = product.variants?.find((v: ProductVariant) => v.id === item.variantId);
      
      if (!variant) {
        outOfStockItems.push({
          ...item,
          reason: 'Variant not found'
        });
        continue;
      }
      
      // Check if requested quantity is available
      if (variant && variant.stock < item.quantity) {
        outOfStockItems.push({
          ...item,
          product: {
            name: product.name,
            availableStock: variant.stock
          },
          reason: 'Not enough stock'
        });
      }
    }
    
    // If any items are out of stock
    if (outOfStockItems.length > 0) {
      return {
        isValid: false,
        error: CheckoutValidationError.OUT_OF_STOCK,
        errorDetails: { outOfStockItems }
      };
    }
    
    // Cart is valid
    return { isValid: true };
  } catch (error) {
    return {
      isValid: false,
      error: CheckoutValidationError.INVALID_ITEM,
      errorDetails: error
    };
  }
}

/**
 * Complete validation for checkout
 * Runs all validation checks
 */
export async function validateCheckout(): Promise<ValidationResult> {
  // First check authentication
  const authResult = await validateAuthentication();
  if (!authResult.isValid) {
    return authResult;
  }
  
  // Then validate cart data
  return validateCart();
}
