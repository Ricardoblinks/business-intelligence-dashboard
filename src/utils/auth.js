export const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

// For mock API usage
export const generateToken = () => {
  return Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
};

// For secure storage and retrieval of tokens
export const setAuthToken = (token) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
    
    // Also set in cookie for middleware to access
    document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 days
  }
};

export const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

export const removeAuthToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    
    // Also remove from cookies
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
  }
};

// For handling auto logout
export const getLastActivityTime = () => {
  if (typeof window !== 'undefined') {
    const time = localStorage.getItem('lastActivity');
    return time ? parseInt(time, 10) : null;
  }
  return null;
};

export const setLastActivityTime = (time = Date.now()) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('lastActivity', time.toString());
  }
};

export const checkInactivity = (timeout = 60000) => {
  const lastActivity = getLastActivityTime();
  if (!lastActivity) return false;
  
  const now = Date.now();
  const timeSinceLastActivity = now - lastActivity;
  
  return timeSinceLastActivity > timeout;
};