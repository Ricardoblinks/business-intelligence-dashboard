import React, { useState } from 'react';

const Input = ({
  label,
  id,
  name,
  type = 'text',
  required = false,
  error,
  value,
  onChange,
  placeholder,
  autoComplete,
  className = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`block w-full px-3 py-2 border ${
            error
              ? 'border-red-300 dark:border-red-500 text-red-900 dark:text-red-400 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
              : `border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 ${
                  isFocused ? 'ring-1 ring-blue-500' : ''
                }`
          } rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 transition-all duration-200`}
          {...props}
        />
        
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg 
              className="h-5 w-5 text-red-500" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor" 
              aria-hidden="true"
            >
              <path 
                fillRule="evenodd" 
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
                clipRule="evenodd" 
              />
            </svg>
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default Input;