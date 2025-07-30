/**
 * API Error Handling
 * 
 * Utility for handling API errors consistently
 */

import { ApiError } from './api';

// Error class for API errors
export class ApiClientError extends Error {
  code: string;
  details?: any;
  status: number;

  constructor(code: string, message: string, status: number = 0, details?: any) {
    super(message);
    this.name = 'ApiClientError';
    this.code = code;
    this.status = status;
    this.details = details;
  }

  // Factory method for creating error from API response
  static fromApiError(error: ApiError, status: number = 0): ApiClientError {
    return new ApiClientError(
      error.code,
      error.message,
      status,
      error.details
    );
  }

  // Network error (no response)
  static networkError(message: string = 'Network error'): ApiClientError {
    return new ApiClientError('NETWORK_ERROR', message, 0);
  }

  // Unauthorized error (401)
  static unauthorized(message: string = 'Unauthorized'): ApiClientError {
    return new ApiClientError('UNAUTHORIZED', message, 401);
  }

  // Forbidden error (403)
  static forbidden(message: string = 'Forbidden'): ApiClientError {
    return new ApiClientError('FORBIDDEN', message, 403);
  }

  // Not found error (404)
  static notFound(message: string = 'Not found'): ApiClientError {
    return new ApiClientError('NOT_FOUND', message, 404);
  }

  // Server error (500)
  static serverError(message: string = 'Server error'): ApiClientError {
    return new ApiClientError('SERVER_ERROR', message, 500);
  }
}

// Global error handler
export const handleApiError = (error: ApiError | null): { message: string, action?: () => void } => {
  if (!error) {
    return { message: 'Unknown error' };
  }

  // Map common error codes to user-friendly messages and actions
  switch (error.code) {
    case 'UNAUTHORIZED':
    case 'ERROR_401':
      return { 
        message: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
        action: () => {
          // Redirect to login page with return URL
          const returnUrl = encodeURIComponent(window.location.pathname);
          window.location.href = `/login?returnUrl=${returnUrl}`;
        }
      };

    case 'FORBIDDEN':
    case 'ERROR_403':
      return { 
        message: 'Bạn không có quyền thực hiện hành động này.' 
      };

    case 'NOT_FOUND':
    case 'ERROR_404':
      return { 
        message: 'Không tìm thấy tài nguyên yêu cầu.' 
      };

    case 'VALIDATION_ERROR':
      return { 
        message: error.message || 'Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.' 
      };

    case 'NETWORK_ERROR':
      return { 
        message: 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối internet.' 
      };

    case 'SERVER_ERROR':
    case 'ERROR_500':
      return { 
        message: 'Có lỗi xảy ra từ máy chủ. Vui lòng thử lại sau.' 
      };

    default:
      return { 
        message: error.message || 'Đã xảy ra lỗi. Vui lòng thử lại.' 
      };
  }
};

// Retry configuration
export const DEFAULT_RETRY_CONFIG = {
  retries: 3,
  initialDelayMs: 500,
  maxDelayMs: 5000,
  shouldRetry: (error: ApiError) => {
    // Retry on network errors or server errors (5xx)
    return (
      error.code === 'NETWORK_ERROR' ||
      error.code.startsWith('ERROR_5')
    );
  }
};

/**
 * Retry function for API calls
 * @param fn Function to retry
 * @param options Retry configuration
 * @returns Result of function or throws error after retries
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  options = DEFAULT_RETRY_CONFIG
): Promise<T> {
  let lastError: any;
  let delay = options.initialDelayMs;

  for (let attempt = 0; attempt <= options.retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      
      const apiError = err as ApiError;
      
      // Check if we should retry
      if (attempt >= options.retries || !options.shouldRetry(apiError)) {
        break;
      }
      
      // Wait before next retry with exponential backoff
      await new Promise(resolve => setTimeout(resolve, delay));
      delay = Math.min(delay * 2, options.maxDelayMs);
    }
  }

  throw lastError;
}
