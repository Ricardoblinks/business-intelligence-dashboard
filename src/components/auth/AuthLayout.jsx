
import React from 'react';
import Link from 'next/link';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            {title}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {subtitle}
          </p>
        </div>
        
        <div className="mt-8 bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {children}
        </div>
        
        <div className="text-center mt-4">
          <Link 
            href="/"
            className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
          >
            &larr; Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;