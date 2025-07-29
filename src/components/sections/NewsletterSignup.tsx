'use client';

import { useState } from 'react';

interface NewsletterSignupProps {
  title?: string;
  subtitle?: string;
  placeholder?: string;
  buttonText?: string;
  backgroundColor?: 'white' | 'gray' | 'blue';
  onSubmit?: (email: string) => Promise<void>;
}

export default function NewsletterSignup({
  title = 'Đăng ký nhận tin',
  subtitle = 'Nhận thông báo về sản phẩm mới, khuyến mãi và xu hướng thời trang mới nhất',
  placeholder = 'Nhập địa chỉ email của bạn',
  buttonText = 'Đăng ký',
  backgroundColor = 'blue',
  onSubmit
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setMessage({ type: 'error', text: 'Vui lòng nhập địa chỉ email' });
      return;
    }

    if (!isValidEmail(email)) {
      setMessage({ type: 'error', text: 'Địa chỉ email không hợp lệ' });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      if (onSubmit) {
        await onSubmit(email);
      } else {
        // Default behavior - simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      setMessage({ type: 'success', text: 'Đăng ký thành công! Cảm ơn bạn đã đăng ký.' });
      setEmail('');
    } catch (error) {
      setMessage({ type: 'error', text: 'Có lỗi xảy ra. Vui lòng thử lại sau.' });
    } finally {
      setIsLoading(false);
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const getBackgroundClasses = () => {
    switch (backgroundColor) {
      case 'white':
        return 'bg-white';
      case 'gray':
        return 'bg-gray-50';
      case 'blue':
        return 'bg-blue-600';
      default:
        return 'bg-blue-600';
    }
  };

  const getTextClasses = () => {
    switch (backgroundColor) {
      case 'white':
      case 'gray':
        return 'text-gray-900';
      case 'blue':
        return 'text-white';
      default:
        return 'text-white';
    }
  };

  const getSubtitleClasses = () => {
    switch (backgroundColor) {
      case 'white':
      case 'gray':
        return 'text-gray-600';
      case 'blue':
        return 'text-blue-100';
      default:
        return 'text-blue-100';
    }
  };

  return (
    <div className={`py-16 ${getBackgroundClasses()}`}>
      <div className="ps-container">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-8">
            <h2 className={`text-3xl md:text-4xl font-light mb-4 ${getTextClasses()}`}>
              {title}
            </h2>
            <p className={`text-lg ${getSubtitleClasses()} max-w-2xl mx-auto`}>
              {subtitle}
            </p>
          </div>

          {/* Newsletter Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex gap-3 mb-4">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={placeholder}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  disabled={isLoading}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 whitespace-nowrap"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Đang xử lý...</span>
                  </div>
                ) : (
                  buttonText
                )}
              </button>
            </div>

            {/* Message */}
            {message && (
              <div className={`text-sm p-3 rounded-lg ${
                message.type === 'success' 
                  ? 'bg-green-100 text-green-700 border border-green-200' 
                  : 'bg-red-100 text-red-700 border border-red-200'
              }`}>
                {message.text}
              </div>
            )}
          </form>

          {/* Features */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3">
              <svg className={`w-5 h-5 ${getTextClasses()}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className={`text-sm ${getSubtitleClasses()}`}>
                Tin tức hàng tuần
              </span>
            </div>
            
            <div className="flex items-center justify-center gap-3">
              <svg className={`w-5 h-5 ${getTextClasses()}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <span className={`text-sm ${getSubtitleClasses()}`}>
                Ưu đãi độc quyền
              </span>
            </div>
            
            <div className="flex items-center justify-center gap-3">
              <svg className={`w-5 h-5 ${getTextClasses()}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className={`text-sm ${getSubtitleClasses()}`}>
                Xu hướng mới nhất
              </span>
            </div>
          </div>

          {/* Privacy Notice */}
          <p className={`text-xs ${getSubtitleClasses()} mt-6 max-w-lg mx-auto`}>
            Bằng cách đăng ký, bạn đồng ý nhận email từ chúng tôi. 
            Bạn có thể hủy đăng ký bất kỳ lúc nào. 
            <a href="/privacy" className="underline hover:no-underline">
              Xem chính sách bảo mật
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
