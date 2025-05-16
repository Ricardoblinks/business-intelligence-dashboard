// src/lib/mockApi.js
// Mock API service for our BI dashboard

// Helper function to simulate API call delay
const simulateDelay = async (minMs = 300, maxMs = 800) => {
  const delay = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
  await new Promise(resolve => setTimeout(resolve, delay));
};

// Get users data
export const getUsers = async () => {
  try {
    await simulateDelay();
    const response = await fetch('/api/users');
    
    if (!response.ok) {
      throw new Error('Failed to fetch users data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Get sales data
export const getSales = async () => {
  try {
    await simulateDelay();
    const response = await fetch('/api/sales');
    
    if (!response.ok) {
      throw new Error('Failed to fetch sales data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching sales:', error);
    throw error;
  }
};

// Get sessions data
export const getSessions = async () => {
  try {
    await simulateDelay();
    const response = await fetch('/api/sessions');
    
    if (!response.ok) {
      throw new Error('Failed to fetch sessions data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching sessions:', error);
    throw error;
  }
};

// Get sales trend data
export const getSalesTrend = async () => {
  try {
    await simulateDelay();
    const response = await fetch('/api/sales/trend');
    
    if (!response.ok) {
      throw new Error('Failed to fetch sales trend data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching sales trend:', error);
    throw error;
  }
};

// Get user growth data
export const getUserGrowth = async () => {
  try {
    await simulateDelay();
    const response = await fetch('/api/users/growth');
    
    if (!response.ok) {
      throw new Error('Failed to fetch user growth data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching user growth:', error);
    throw error;
  }
};

// Get revenue by category data
export const getRevenueByCategory = async () => {
  try {
    await simulateDelay();
    const response = await fetch('/api/revenue/categories');
    
    if (!response.ok) {
      throw new Error('Failed to fetch revenue category data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching revenue by category:', error);
    throw error;
  }
};

// Helper function to simulate API errors (for testing error handling)
export const simulateError = async () => {
  await simulateDelay(500, 500);
  throw new Error('API error simulation');
};
