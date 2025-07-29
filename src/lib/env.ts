// Environment configuration for the application
export const env = {
  // Database
  MONGODB_URI: process.env.MONGODB_URI!,
  
  // NextAuth
  NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET!,
  
  // App
  NODE_ENV: process.env.NODE_ENV || 'development',
  APP_URL: process.env.APP_URL || 'http://localhost:3000',
  APP_NAME: process.env.APP_NAME || 'TieuLuanTMDT E-commerce',
  
  // Email (for future use)
  EMAIL_SERVER_HOST: process.env.EMAIL_SERVER_HOST,
  EMAIL_SERVER_PORT: process.env.EMAIL_SERVER_PORT ? parseInt(process.env.EMAIL_SERVER_PORT) : 587,
  EMAIL_FROM: process.env.EMAIL_FROM,
  
  // Payment (for future use)
  VNPAY_MERCHANT_ID: process.env.VNPAY_MERCHANT_ID,
  VNPAY_SECRET_KEY: process.env.VNPAY_SECRET_KEY,
  STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
};

// Validate required environment variables
export function validateEnv() {
  const required = ['MONGODB_URI', 'NEXTAUTH_SECRET'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

export default env;
