// Auth utility functions
export const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

// For mock API usage
export const generateToken = () => {
  return Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
};

// For secure storage and retrieval of tokens
export const setAuthToken = (token) => {
  localStorage.setItem('token', token);
};

export const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const removeAuthToken = () => {
  localStorage.removeItem('token');
};

// For handling auto logout
export const getLastActivityTime = () => {
  const time = localStorage.getItem('lastActivity');
  return time ? parseInt(time, 10) : null;
};

export const setLastActivityTime = (time = Date.now()) => {
  localStorage.setItem('lastActivity', time.toString());
};

export const checkInactivity = (timeout = 60000) => {
  const lastActivity = getLastActivityTime();
  if (!lastActivity) return false;
  
  const now = Date.now();
  const timeSinceLastActivity = now - lastActivity;
  
  return timeSinceLastActivity > timeout;
};