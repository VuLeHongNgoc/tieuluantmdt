'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function AuthStatusToast() {
  const { data: session, status } = useSession();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      setToastMessage(`Chào mừng bạn trở lại, ${session.user.name}! 🎉`);
      setShowToast(true);
      
      // Auto hide after 5 seconds
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [status, session]);

  if (!showToast) return null;

  return (
    <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300 animate-slide-in">
      <div className="flex items-center space-x-2">
        <span className="text-xl">✅</span>
        <span className="font-medium">{toastMessage}</span>
        <button
          onClick={() => setShowToast(false)}
          className="ml-4 text-white hover:text-gray-200"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
