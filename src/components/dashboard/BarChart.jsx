import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CustomBarChart = ({ data, title, dataKey = 'value', loading = false }) => {
  // Format y-axis values (numbers)
  const formatYAxis = (value) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value;
  };
  
  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 shadow-md rounded-md border border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 font-medium">{label}</p>
          <p className="text-blue-600 dark:text-blue-400 font-bold">
            {formatYAxis(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 h-full">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{title}</h3>
      
      {loading ? (
        <div className="flex flex-col space-y-4 animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <YAxis 
                tickFormatter={formatYAxis}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey={dataKey} 
                fill="#3b82f6" 
                radius={[4, 4, 0, 0]} 
                barSize={30}
                // Add hover effect
                onMouseOver={(data, index) => {
                  document.querySelector(`.bar-${index}`).style.fill = '#2563eb';
                }}
                onMouseOut={(data, index) => {
                  document.querySelector(`.bar-${index}`).style.fill = '#3b82f6';
                }}
                className={(_, index) => `bar-${index}`}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default CustomBarChart;
