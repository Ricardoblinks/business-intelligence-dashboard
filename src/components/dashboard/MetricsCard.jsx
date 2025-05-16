import React from 'react';

const MetricsCard = ({ title, value, icon, change, changeType = 'increase', loading = false }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
      <div className="p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
          {icon && <div className="text-gray-400 dark:text-gray-500">{icon}</div>}
        </div>
        
        <div className="mt-2">
          {loading ? (
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          ) : (
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
          )}
        </div>
        
        {change !== undefined && !loading && (
          <div className="mt-2 flex items-center">
            <span className={`text-sm font-medium ${
              changeType === 'increase' 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
            }`}>
              {changeType === 'increase' ? (
                <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              {change}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">from last period</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricsCard;
