/**
 * API Authentication Integration
 * 
 * Integrates the API client with NextAuth.js authentication
 */

import { getSession, signIn, signOut } from 'next-auth/react';
import { api, ApiResponse } from './api';

// Extended session type to include token
export interface AuthSession {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id?: string | null;
    role?: string | null;
  };
  expires: string;
  accessToken?: string;
}

/**
 * Get authenticated user session
 * @returns User session or null
 */
export const getAuthSession = async (): Promise<AuthSession | null> => {
  try {
    const session = await getSession();
    return session as unknown as AuthSession;
  } catch (error) {
    console.error('Error getting auth session:', error);
    return null;
  }
};

/**
 * Add auth token to request headers
 * @param headers Request headers
 */
export const addAuthHeaders = async (headers: Record<string, string>): Promise<Record<string, string>> => {
  const session = await getAuthSession();
  
  if (session?.accessToken) {
    return {
      ...headers,
      'Authorization': `Bearer ${session.accessToken}`,
    };
  }
  
  return headers;
};

/**
 * Check if current user is authenticated
 */
export const isAuthenticated = async (): Promise<boolean> => {
  const session = await getAuthSession();
  return !!session;
};

/**
 * Check if current user has admin role
 */
export const isAdmin = async (): Promise<boolean> => {
  const session = await getAuthSession();
  return session?.user?.role === 'admin';
};

/**
 * Handle authentication errors (refresh token or redirect to login)
 * @param error API error
 * @param originalRequest Original request function to retry after token refresh
 */
export const handleAuthError = async <T>(
  error: any,
  originalRequest: () => Promise<ApiResponse<T>>
): Promise<ApiResponse<T>> => {
  if (error.code === 'UNAUTHORIZED' || error.status === 401) {
    // Try to refresh the token
    try {
      // This assumes you have a token refresh endpoint
      const refreshResult = await api.post('/auth/refresh-token');
      
      if (!refreshResult.error) {
        // Token refreshed, retry the original request
        return originalRequest();
      }
    } catch (refreshError) {
      // Refresh failed
    }
    
    // If we get here, refresh failed or wasn't possible
    // Redirect to login
    await signOut({ redirect: false });
    
    // Redirect to login page with return URL
    const returnUrl = encodeURIComponent(window.location.pathname);
    window.location.href = `/login?returnUrl=${returnUrl}`;
  }
  
  // Return the original error response
  return {
    data: null,
    error: error,
    status: error.status || 0,
  };
};

/**
 * Login handler
 * @param email User email
 * @param password User password
 * @returns Success status and error message if any
 */
export const loginUser = async (
  email: string, 
  password: string
): Promise<{ success: boolean, error?: string }> => {
  try {
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    
    if (result?.error) {
      return {
        success: false,
        error: result.error,
      };
    }
    
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: 'An unexpected error occurred during login',
    };
  }
};

/**
 * Logout handler
 */
export const logoutUser = async (): Promise<void> => {
  await signOut({ redirect: true, callbackUrl: '/' });
};

/**
 * Register a new user
 * @param userData User registration data
 */
export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
}): Promise<{ success: boolean, error?: string }> => {
  try {
    const response = await api.post('/auth/register', userData);
    
    if (response.error) {
      return {
        success: false,
        error: response.error.message,
      };
    }
    
    // Automatically log in after registration
    return loginUser(userData.email, userData.password);
  } catch (error) {
    return {
      success: false,
      error: 'An unexpected error occurred during registration',
    };
  }
};
