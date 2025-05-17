// src/hooks/useInactivityTimer.js (improved version)
import { useState, useEffect, useCallback } from 'react';
import useAuth from './useAuth';

const useInactivityTimer = (timeout = 60000, enabled = true) => {
  const [isInactive, setIsInactive] = useState(false);
  const { logout, rememberMe, setLastActivity } = useAuth();

  const resetTimer = useCallback(() => {
    const now = Date.now();
    setLastActivity(now);
    localStorage.setItem('lastActivity', now.toString());
    setIsInactive(false);
  }, [setLastActivity]);

  useEffect(() => {
    // Don't track inactivity if disabled or remember me is enabled
    if (!enabled || rememberMe) return;

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
      const lastActivityTime = localStorage.getItem('lastActivity');
      if (!lastActivityTime) return;
      
      const inactiveTime = Date.now() - parseInt(lastActivityTime, 10);
      
      // Check if inactive for longer than timeout
      if (inactiveTime > timeout) {
        setIsInactive(true);
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
  }, [timeout, enabled, rememberMe, logout, resetTimer]);

  return { isInactive, resetTimer };
};

export default useInactivityTimer;