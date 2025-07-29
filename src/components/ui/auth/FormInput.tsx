import React, { InputHTMLAttributes, forwardRef } from 'react';

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, icon, className = '', ...props }, ref) => {
    const inputId = props.id || props.name || Math.random().toString(36).substring(2, 9);

    return (
      <div className="form-group mb-4">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <div className={`relative ${error ? 'has-error' : ''}`}>
          <input
            ref={ref}
            {...props}
            id={inputId}
            className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-primary focus:border-primary ${
              icon ? 'pl-10' : ''
            } ${error ? 'border-red-500' : ''} ${className}`}
          />
          {icon && (
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              {icon}
            </span>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

export default FormInput;
