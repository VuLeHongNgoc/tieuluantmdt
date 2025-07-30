'use client';

import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState<{
    type: 'idle' | 'loading' | 'success' | 'error';
    message: string;
  }>({
    type: 'idle',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({
        type: 'error',
        message: 'Vui lòng điền đầy đủ thông tin.'
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({
        type: 'error',
        message: 'Vui lòng nhập đúng định dạng email.'
      });
      return;
    }

    setStatus({
      type: 'loading',
      message: 'Đang gửi tin nhắn...'
    });

    try {
      // In a real application, you would send this data to your API
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });
      
      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Clear form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      setStatus({
        type: 'success',
        message: 'Cảm ơn! Tin nhắn của bạn đã được gửi thành công.'
      });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setStatus({
          type: 'idle',
          message: ''
        });
      }, 5000);
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau.'
      });
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      {status.message && (
        <div className={`${status.type === 'success' ? 'bg-green-100 text-green-800 border-green-300' : 'bg-red-100 text-red-800 border-red-300'} p-4 mb-6 rounded-md border`}>
          {status.message}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="form-group">
          <input 
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition" 
            type="text" 
            placeholder="Họ và tên" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            required 
          />
        </div>
        <div className="form-group">
          <input
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition"
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      
      <div className="form-group mb-4">
        <input 
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition" 
          type="text" 
          placeholder="Tiêu đề" 
          name="subject"
          value={formData.subject}
          onChange={handleChange}
        />
      </div>
      
      <div className="form-group mb-4">
        <textarea 
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition" 
          rows={6} 
          placeholder="Nội dung" 
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      
      <div className="form-group">
        <button 
          type="submit"
          className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-200"
          disabled={status.type === 'loading'}
        >
          {status.type === 'loading' ? 'Đang gửi...' : 'Gửi tin nhắn'}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
