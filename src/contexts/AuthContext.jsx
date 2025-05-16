import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';

// Create auth context
export const AuthContext = createContext();

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
      
      // Call the mock API endpoint
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, rememberMe: rememberMeOption }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }
      
      const data = await response.json();
      
      // Set user state and last activity
      setUser(data.user);
      setRememberMe(rememberMeOption);
      setLastActivity(Date.now());
      
      // Store in localStorage if remember me is selected or for session
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      localStorage.setItem('rememberMe', rememberMeOption ? 'true' : 'false');
      
      return data.user;
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
      
      // Call the mock API endpoint
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Registration failed');
      }
      
      const data = await response.json();
      return data.user;
    } catch (err) {
      setError(err.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      // Call the logout API endpoint
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // Always clear local state regardless of API response
      setUser(null);
      setRememberMe(false);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('rememberMe');
      
      // Redirect to login page
      if (typeof window !== 'undefined') {
        router.push('/login');
      }
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