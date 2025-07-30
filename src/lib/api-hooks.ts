/**
 * API Hooks
 * 
 * React hooks for API integration with loading states and error handling
 */

import { useCallback, useEffect, useState } from 'react';
import { api, ApiError, ApiResponse } from './api';

/**
 * Custom hook for data fetching with loading and error states
 * @param endpoint API endpoint
 * @param queryParams Query parameters
 * @returns Object with data, loading state, error, and refetch function
 */
export function useApiGet<T>(
  endpoint: string, 
  queryParams?: Record<string, string>,
  initialData: T | null = null
) {
  const [data, setData] = useState<T | null>(initialData);
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await api.get<T>(endpoint, queryParams);
      
      if (response.error) {
        setError(response.error);
      } else {
        setData(response.data);
      }
    } catch (err) {
      setError({
        code: 'UNKNOWN_ERROR',
        message: err instanceof Error ? err.message : 'An unknown error occurred',
      });
    } finally {
      setIsLoading(false);
    }
  }, [endpoint, JSON.stringify(queryParams)]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData
  };
}

/**
 * Generic type for mutation input data
 */
type MutationData<T> = T;

/**
 * Hook for mutations (POST, PUT, DELETE requests)
 * @param method HTTP method
 * @param endpoint API endpoint (can include `:param` placeholders)
 * @returns Object with mutate function, data, loading and error states
 */
export function useApiMutation<TData, TInput = any>(
  method: 'post' | 'put' | 'delete',
  endpoint: string
) {
  const [data, setData] = useState<TData | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Replace :param placeholders in endpoint with values from params
  const getEndpoint = (params?: Record<string, string>) => {
    if (!params) return endpoint;
    
    let finalEndpoint = endpoint;
    Object.entries(params).forEach(([key, value]) => {
      finalEndpoint = finalEndpoint.replace(`:${key}`, value);
    });
    return finalEndpoint;
  };

  const mutate = useCallback(async (
    inputData?: MutationData<TInput>, 
    params?: Record<string, string>
  ) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const finalEndpoint = getEndpoint(params);
      let response: ApiResponse<TData>;
      
      if (method === 'post') {
        response = await api.post<TData>(finalEndpoint, inputData);
      } else if (method === 'put') {
        response = await api.put<TData>(finalEndpoint, inputData);
      } else { // delete
        response = await api.delete<TData>(finalEndpoint);
      }
      
      if (response.error) {
        setError(response.error);
        return { success: false, error: response.error };
      } else {
        setData(response.data);
        return { success: true, data: response.data };
      }
    } catch (err) {
      const apiError = {
        code: 'UNKNOWN_ERROR',
        message: err instanceof Error ? err.message : 'An unknown error occurred',
      };
      setError(apiError);
      return { success: false, error: apiError };
    } finally {
      setIsLoading(false);
    }
  }, [method, endpoint]);

  return {
    mutate,
    data,
    isLoading,
    error,
    reset: () => {
      setData(null);
      setError(null);
    }
  };
}

/**
 * Hook for uploading files
 * @param endpoint API endpoint for file upload
 * @returns Object with upload function, data, loading and error states
 */
export function useFileUpload<T>(endpoint: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const upload = useCallback(async (
    file: File, 
    additionalData?: Record<string, any>
  ) => {
    setIsLoading(true);
    setError(null);
    setProgress(0);
    
    try {
      // In a real implementation, you might use XMLHttpRequest to track progress
      // For simplicity, we'll just simulate progress here
      setProgress(30);
      setTimeout(() => setProgress(60), 500);
      
      const response = await api.uploadFile<T>(endpoint, file, additionalData);
      
      setProgress(100);
      
      if (response.error) {
        setError(response.error);
        return { success: false, error: response.error };
      } else {
        setData(response.data);
        return { success: true, data: response.data };
      }
    } catch (err) {
      const apiError = {
        code: 'UPLOAD_ERROR',
        message: err instanceof Error ? err.message : 'File upload failed',
      };
      setError(apiError);
      return { success: false, error: apiError };
    } finally {
      setIsLoading(false);
    }
  }, [endpoint]);

  return {
    upload,
    data,
    isLoading,
    error,
    progress,
    reset: () => {
      setData(null);
      setError(null);
      setProgress(0);
    }
  };
}

/**
 * Custom hook for handling API errors
 * @param error API error object
 * @param defaultMessage Default message if error is null
 * @returns Formatted error message
 */
export function useApiError(error: ApiError | null, defaultMessage = 'An error occurred') {
  if (!error) return defaultMessage;
  
  // Map common error codes to user-friendly messages
  switch (error.code) {
    case 'UNAUTHORIZED':
    case 'ERROR_401':
      return 'Vui lòng đăng nhập để tiếp tục';
    case 'ERROR_403':
      return 'Bạn không có quyền thực hiện hành động này';
    case 'ERROR_404':
      return 'Không tìm thấy tài nguyên yêu cầu';
    case 'ERROR_500':
      return 'Có lỗi xảy ra từ máy chủ, vui lòng thử lại sau';
    case 'NETWORK_ERROR':
      return 'Không thể kết nối đến máy chủ, vui lòng kiểm tra kết nối internet';
    default:
      return error.message || defaultMessage;
  }
}

/**
 * Hook for handling offline status
 * @returns Boolean indicating whether the app is offline
 */
export function useOfflineStatus() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  return isOffline;
}
