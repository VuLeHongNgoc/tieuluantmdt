'use client';

import AuthButton from '@/components/ui/auth/AuthButton';
import FormInput from '@/components/ui/auth/FormInput';
import Link from 'next/link';
import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate email
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // In a real implementation, this would call an API endpoint
      // For now, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Forgot password error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="w-full text-center">
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">
                Password reset email sent. Check your inbox for further instructions.
              </p>
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-4">Email Sent!</h2>
        <p className="mb-6">
          If an account exists with the email <span className="font-medium">{email}</span>,
          you will receive password reset instructions.
        </p>
        
        <Link href="/auth/login" className="text-primary hover:text-primary-dark">
          Return to login page
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Forgot Password</h1>
        <p className="text-gray-600">Enter your email to receive a password reset link</p>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email Address"
          type="email"
          name="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError('');
          }}
          error={error}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          }
        />
        
        <div className="mb-6 mt-6">
          <AuthButton type="submit" isLoading={isLoading}>
            Send Reset Link
          </AuthButton>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Remember your password?{' '}
            <Link href="/auth/login" className="text-primary hover:text-primary-dark">
              Back to login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
