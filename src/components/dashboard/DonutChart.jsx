import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const DonutChart = ({ data, title, dataKey = 'value', nameKey = 'name', loading = false }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  
  // Colors for the pie chart segments
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#6366f1'];
  
  // Format values
  const formatValue = (value) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value}`;
  };
  
  // Calculate total value for percentage
  const total = data?.reduce((sum, entry) => sum + entry[dataKey], 0) || 0;
  
  // Calculate percentage
  const getPercentage = (value) => {
    if (!total) return '0%';
    return `${((value / total) * 100).toFixed(1)}%`;
  };
  
  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-3 shadow-md rounded-md border border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 font-medium">{name}</p>
          <p className="text-blue-600 dark:text-blue-400 font-bold">{formatValue(value)}</p>
          <p className="text-gray-500 dark:text-gray-400">{getPercentage(value)}</p>
        </div>
      );
    }
    return null;
  };
  
  // Custom legend
  const CustomLegend = ({ payload }) => {
    return (
      <ul className="flex flex-wrap justify-center mt-2">
        {payload.map((entry, index) => (
          <li key={`legend-${index}`} className="flex items-center mx-2 mb-2">
            <div
              className="w-3 h-3 rounded-full mr-1"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs text-gray-600 dark:text-gray-400">{entry.value}</span>
          </li>
        ))}
      </ul>
    );
  };

  // Handle mouse enter
  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };
  
  // Handle mouse leave
  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 h-full">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{title}</h3>
      
      {loading ? (
        <div className="flex flex-col space-y-4 animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto"></div>
        </div>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey={dataKey}
                nameKey={nameKey}
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke="none"
                    opacity={activeIndex === null || activeIndex === index ? 1 : 0.7}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default DonutChart;
