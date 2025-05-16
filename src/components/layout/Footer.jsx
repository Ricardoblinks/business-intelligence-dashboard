import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-8 py-4 border-t border-gray-200 dark:border-gray-700">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          © {currentYear} BizInsight. All rights reserved.
        </div>
        <div className="mt-2 md:mt-0 flex space-x-4">
          <a 
            href="#" 
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            Privacy Policy
          </a>
          <a 
            href="#" 
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            Terms of Service
          </a>
          <a 
            href="#" 
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            Support
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;