import { useEffect } from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  // Initialize Mock Service Worker in development environment
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const initMocks = async () => {
        if (typeof window === 'undefined') {
          return;
        }
        
        try {
          const { worker } = await import('../mocks/browser');
          // Start the MSW worker
          worker.start({
            onUnhandledRequest: 'bypass', // Don't warn about unhandled requests
          });
          console.log('MSW worker started successfully');
        } catch (error) {
          console.error('Error starting MSW worker:', error);
        }
      };
      
      initMocks().catch(console.error);
    }
  }, []);
  
  return (
    <AuthProvider>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default MyApp;