'use client';

import React, { useState } from 'react';

export function SubscribeHome2() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setMessage('Please enter your email address');
      return;
    }

    if (!email.includes('@')) {
      setMessage('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage('Thank you! You\'ve successfully subscribed for 15% off.');
      setEmail('');
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="ps-subscribe--3 bg-cover bg-center bg-no-repeat relative py-20 lg:py-32"
      style={{
        backgroundImage: 'url("/images/background/subscribe-2.jpg")'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      
      {/* Content */}
      <div className="ps-container-fluid px-4 md:px-8 relative z-10">
        <form 
          className="ps-form--subscribe-3 max-w-3xl mx-auto text-center text-white"
          onSubmit={handleSubmit}
        >
          {/* Heading */}
          <h3 
            className="ps-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            style={{ fontFamily: 'Nunito Sans, sans-serif' }}
          >
            Get 15% Off Your Next Order
          </h3>
          
          {/* Description */}
          <p className="text-lg md:text-xl leading-relaxed mb-8 text-gray-200">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed 
            fermentum nibh, <br className="hidden md:block" />
            vel aliquet massa. Etiam in magna id risus lacinia luctus eget eu est.
          </p>
          
          {/* Subscribe Form */}
          <div className="form-group max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
              {/* Email Input */}
              <div className="flex-1 w-full md:w-auto">
                <input
                  className="form-control w-full px-6 py-4 text-gray-800 placeholder-gray-500 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-[#ca2028] text-center md:text-left"
                  type="email"
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  style={{
                    fontFamily: 'Nunito Sans, sans-serif',
                    minHeight: '56px'
                  }}
                />
              </div>
              
              {/* Submit Button */}
              <button 
                type="submit"
                disabled={isSubmitting}
                className="ps-btn ps-btn--red px-8 py-4 bg-[#ca2028] text-white font-bold text-sm uppercase rounded-full hover:bg-[#a01a20] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none whitespace-nowrap"
                style={{
                  fontFamily: 'Nunito Sans, sans-serif',
                  letterSpacing: '1px',
                  minHeight: '56px'
                }}
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Subscribing...</span>
                  </div>
                ) : (
                  'Register for 15% discount'
                )}
              </button>
            </div>
            
            {/* Message */}
            {message && (
              <div className={`mt-4 p-3 rounded-lg ${
                message.includes('Thank you') 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {message}
              </div>
            )}
          </div>

          {/* Additional Benefits */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2">Exclusive Offers</h4>
              <p className="text-gray-300 text-sm">Get early access to sales and special promotions</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v2m0 0v14a2 2 0 01-2 2H5a2 2 0 01-2-2V4m0 0V2a1 1 0 011-1h2a1 1 0 011 1v2" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2">New Arrivals</h4>
              <p className="text-gray-300 text-sm">Be the first to know about our latest collections</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2">Style Tips</h4>
              <p className="text-gray-300 text-sm">Receive fashion tips and styling advice from experts</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
