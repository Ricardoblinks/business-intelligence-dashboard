import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { setAuthToken, getAuthToken, removeAuthToken } from '../utils/auth';

// Create auth context
export const AuthContext = createContext();

// Mock users for testing
const mockUsers = [
  {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const router = useRouter();

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        const storedRememberMe = localStorage.getItem('rememberMe') === 'true';
        
        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
          setRememberMe(storedRememberMe);
          setLastActivity(Date.now());
        }
      } catch (err) {
        console.error('Failed to parse stored user', err);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('rememberMe');
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Handle user inactivity - Auto logout feature
  useEffect(() => {
    // Don't track inactivity if user isn't logged in or has remember me enabled
    if (!user || rememberMe) return;

    const resetTimer = () => setLastActivity(Date.now());
    
    // Events that reset the inactivity timer
    const events = [
      'mousedown', 
      'mousemove', 
      'keypress', 
      'scroll', 
      'touchstart',
      'click',
      'keydown'
    ];
    
    // Add event listeners to reset timer on user activity
    events.forEach(event => {
      window.addEventListener(event, resetTimer);
    });

    // Check for inactivity every 10 seconds
    const interval = setInterval(() => {
      const inactiveTime = Date.now() - lastActivity;
      // Logout after 1 minute of inactivity (60000ms)
      if (inactiveTime > 60000) {
        console.log('Auto logout due to inactivity');
        logout();
      }
    }, 10000);

    return () => {
      // Clean up event listeners and interval
      events.forEach(event => {
        window.removeEventListener(event, resetTimer);
      });
      clearInterval(interval);
    };
  }, [user, rememberMe, lastActivity]);

  const login = useCallback(async (email, password, rememberMeOption) => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Find user in mock data
      const foundUser = mockUsers.find(u => u.email === email && u.password === password);
      
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }
      
      // Create mock token
      const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      
      // Remove password from user data
      const { password: _, ...userWithoutPassword } = foundUser;
      
      // Set user state and last activity
      setUser(userWithoutPassword);
      setRememberMe(rememberMeOption);
      setLastActivity(Date.now());
      
      // Store in localStorage
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      localStorage.setItem('token', token);
      localStorage.setItem('rememberMe', rememberMeOption ? 'true' : 'false');
      
      // Set auth token in utils function
      setAuthToken(token);
      
      return userWithoutPassword;
    } catch (err) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (email, password, name) => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Check if user already exists
      if (mockUsers.some(u => u.email === email)) {
        throw new Error('User already exists');
      }
      
      // Create new user
      const newUser = {
        id: mockUsers.length + 1,
        name,
        email,
        password,
      };
      
      // Add to mock users (in a real app, this would be an API call)
      mockUsers.push(newUser);
      
      const { password: _, ...userWithoutPassword } = newUser;
      return userWithoutPassword;
    } catch (err) {
      setError(err.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    // Clear user state
    setUser(null);
    setRememberMe(false);
    
    // Clear localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('rememberMe');
    
    // Clear auth token
    removeAuthToken();
    
    // Redirect to login page
    if (typeof window !== 'undefined') {
      router.push('/login');
    }
  }, [router]);

  const value = {
    user,
    loading,
    error,
    rememberMe,
    login,
    register,
    logout,
    setLastActivity,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;