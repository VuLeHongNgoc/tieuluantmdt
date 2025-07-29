import React, { ButtonHTMLAttributes } from 'react';

export interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

const AuthButton: React.FC<AuthButtonProps> = ({
  children,
  isLoading = false,
  variant = 'primary',
  fullWidth = true,
  className = '',
  ...props
}) => {
  const baseClasses = 'py-3 px-6 font-medium rounded-md transition-all duration-300 flex items-center justify-center';
  
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary-dark',
    secondary: 'bg-secondary text-white hover:bg-secondary-dark',
    outline: 'border border-primary text-primary hover:bg-primary hover:text-white'
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${widthClass} ${className}`;
  
  return (
    <button 
      className={buttonClasses} 
      disabled={isLoading || props.disabled} 
      {...props}
    >
      {isLoading ? (
        <>
          <span className="animate-spin mr-2">
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </span>
          Processing...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default AuthButton;
