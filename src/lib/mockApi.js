// Mock data for our BI dashboard

// Mock users data
export const getUsers = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  return {
    total: 1247,
    active: 843,
    new: 127,
    data: [
      { id: 1, name: 'John Smith', email: 'john@example.com', status: 'active', registeredDate: '2024-02-15', lastLogin: '2025-05-10' },
      { id: 2, name: 'Alice Johnson', email: 'alice@example.com', status: 'active', registeredDate: '2024-03-21', lastLogin: '2025-05-14' },
      { id: 3, name: 'Robert Davis', email: 'robert@example.com', status: 'inactive', registeredDate: '2024-01-10', lastLogin: '2025-04-30' },
      { id: 4, name: 'Emma Wilson', email: 'emma@example.com', status: 'active', registeredDate: '2024-04-05', lastLogin: '2025-05-13' },
      { id: 5, name: 'Michael Brown', email: 'michael@example.com', status: 'active', registeredDate: '2024-02-28', lastLogin: '2025-05-12' },
      { id: 6, name: 'Sophia Miller', email: 'sophia@example.com', status: 'pending', registeredDate: '2024-05-02', lastLogin: null },
      { id: 7, name: 'David Garcia', email: 'david@example.com', status: 'active', registeredDate: '2024-03-15', lastLogin: '2025-05-09' },
      { id: 8, name: 'Olivia Martinez', email: 'olivia@example.com', status: 'active', registeredDate: '2024-01-20', lastLogin: '2025-05-11' },
      { id: 9, name: 'James Lee', email: 'james@example.com', status: 'inactive', registeredDate: '2024-04-12', lastLogin: '2025-04-25' },
      { id: 10, name: 'Ava Robinson', email: 'ava@example.com', status: 'active', registeredDate: '2024-02-10', lastLogin: '2025-05-14' },
    ]
  };
};

// Mock sales data
export const getSales = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return {
    total: 587490.50,
    thisMonth: 128750.75,
    lastMonth: 116280.25,
    growth: 10.7,
    data: [
      { id: 1, customer: 'Acme Corp', amount: 5280.50, date: '2025-05-14', status: 'completed' },
      { id: 2, customer: 'Globex Inc', amount: 3750.00, date: '2025-05-13', status: 'completed' },
      { id: 3, customer: 'Wayne Enterprises', amount: 12500.75, date: '2025-05-12', status: 'completed' },
      { id: 4, customer: 'Stark Industries', amount: 8900.25, date: '2025-05-10', status: 'completed' },
      { id: 5, customer: 'Umbrella Corp', amount: 4320.80, date: '2025-05-09', status: 'pending' },
      { id: 6, customer: 'Oscorp', amount: 6720.30, date: '2025-05-08', status: 'completed' },
      { id: 7, customer: 'Cyberdyne Systems', amount: 9450.00, date: '2025-05-06', status: 'completed' },
      { id: 8, customer: 'Initech', amount: 2300.45, date: '2025-05-05', status: 'failed' },
      { id: 9, customer: 'Massive Dynamic', amount: 15780.90, date: '2025-05-03', status: 'completed' },
      { id: 10, customer: 'Soylent Corp', amount: 7850.60, date: '2025-05-01', status: 'completed' },
    ]
  };
};

// Mock chart data for sales trends (last 12 months)
export const getSalesTrend = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  return [
    { month: 'May 2024', sales: 92300 },
    { month: 'Jun 2024', sales: 98500 },
    { month: 'Jul 2024', sales: 104200 },
    { month: 'Aug 2024', sales: 99800 },
    { month: 'Sep 2024', sales: 105700 },
    { month: 'Oct 2024', sales: 110300 },
    { month: 'Nov 2024', sales: 118200 },
    { month: 'Dec 2024', sales: 125800 },
    { month: 'Jan 2025', sales: 103400 },
    { month: 'Feb 2025', sales: 110900 },
    { month: 'Mar 2025', sales: 116280 },
    { month: 'Apr 2025', sales: 128750 },
  ];
};

// Mock chart data for user growth (last 12 months)
export const getUserGrowth = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 650));
  
  return [
    { month: 'May 2024', users: 520 },
    { month: 'Jun 2024', users: 590 },
    { month: 'Jul 2024', users: 645 },
    { month: 'Aug 2024', users: 690 },
    { month: 'Sep 2024', users: 740 },
    { month: 'Oct 2024', users: 790 },
    { month: 'Nov 2024', users: 850 },
    { month: 'Dec 2024', users: 920 },
    { month: 'Jan 2025', users: 980 },
    { month: 'Feb 2025', users: 1050 },
    { month: 'Mar 2025', users: 1120 },
    { month: 'Apr 2025', users: 1247 },
  ];
};

// Mock chart data for revenue by category
export const getRevenueByCategory = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 550));
  
  return [
    { name: 'Software Licenses', value: 235000 },
    { name: 'Consulting Services', value: 187500 },
    { name: 'Support & Maintenance', value: 98000 },
    { name: 'Training', value: 42000 },
    { name: 'Custom Development', value: 125000 },
  ];
};

// Mock sessions data
export const getSessions = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    total: 5837,
    active: 134,
    average: 12.5, // minutes
  };
};

// Helper function to simulate API errors (for testing error handling)
export const simulateError = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  throw new Error('API error simulation');
};