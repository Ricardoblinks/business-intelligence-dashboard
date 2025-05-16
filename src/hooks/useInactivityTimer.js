import { useState, useEffect, useCallback } from 'react';
import useAuth from './useAuth';

const useInactivityTimer = (timeout = 60000, enabled = true) => {
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [isInactive, setIsInactive] = useState(false);
  const { logout, rememberMe } = useAuth();

  const resetTimer = useCallback(() => {
    setLastActivity(Date.now());
    setIsInactive(false);
  }, []);

  useEffect(() => {
    // Don't track inactivity if disabled or remember me is enabled
    if (!enabled || rememberMe) return;

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    // Add event listeners to reset timer on user activity
    events.forEach(event => {
      window.addEventListener(event, resetTimer);
    });

    // Check for inactivity every 10 seconds
    const interval = setInterval(() => {
      const inactiveTime = Date.now() - lastActivity;
      // Logout after specified timeout
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
  }, [lastActivity, timeout, enabled, rememberMe, logout, resetTimer]);

  return { lastActivity, isInactive, resetTimer };
};

export default useInactivityTimer;