import React, { createContext, useState, useEffect, useCallback } from 'react';
import { setAuthToken, getAuthToken, removeAuthToken } from '../utils/auth';

export const AuthContext = createContext();

const mockUsers = [
  {
    id: 1,
    name: 'HR Branddrive',
    email: 'hr@branddrive.co',
    password: 'password123',
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());

  useEffect(() => {
    const initializeAuth = () => {
      try {
        if (typeof window !== 'undefined') {
          const storedUser = localStorage.getItem('user');
          const storedToken = getAuthToken();
          const storedRememberMe = localStorage.getItem('rememberMe') === 'true';
          const storedLastActivity = localStorage.getItem('lastActivity');
          
          if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setRememberMe(storedRememberMe);
            
            if (storedLastActivity) {
              setLastActivity(parseInt(storedLastActivity, 10));
            } else {
              // Initialize lastActivity if not present
              const now = Date.now();
              setLastActivity(now);
              localStorage.setItem('lastActivity', now.toString());
            }
          }
        }
      } catch (err) {
        console.error('Failed to restore auth state:', err);
        // Clear potentially corrupted data
        if (typeof window !== 'undefined') {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          localStorage.removeItem('rememberMe');
          localStorage.removeItem('lastActivity');
        }
      } finally {
        setLoading(false);
      }
    };
    
    initializeAuth();
  }, []);

  const login = useCallback(async (email, password, rememberMeOption) => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Find user in mock data
      const foundUser = mockUsers.find(u => u.email === email && u.password === password);
      
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }
      
      // Create mock token
      const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      
      // Remove password from user data for security
      const { password: _, ...userWithoutPassword } = foundUser;
      
      // Set user state and last activity
      setUser(userWithoutPassword);
      setRememberMe(rememberMeOption);
      
      const now = Date.now();
      setLastActivity(now);
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        localStorage.setItem('token', token);
        localStorage.setItem('rememberMe', rememberMeOption ? 'true' : 'false');
        localStorage.setItem('lastActivity', now.toString());
        
        // Set auth token in utils function
        setAuthToken(token);
      }
      
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
      await new Promise(resolve => setTimeout(resolve, 500));
      
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
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('rememberMe');
      localStorage.removeItem('lastActivity');
      
      // Clear auth token
      removeAuthToken();
    }
  }, []);

  const value = {
    user,
    loading,
    error,
    rememberMe,
    login,
    register,
    logout,
    lastActivity,
    setLastActivity,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;