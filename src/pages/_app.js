import { useEffect } from 'react';
import Head from 'next/head';
import { AuthProvider } from '../contexts/AuthContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  // Initialize Mock Service Worker in development
  useEffect(() => {
    const initMocks = async () => {
      if (typeof window === 'undefined') {
        return;
      }
      
      if (process.env.NODE_ENV === 'development') {
        try {
          const { worker } = await import('../mocks/browser');
          // Start the MSW worker
          if (worker) {
            await worker.start({
              onUnhandledRequest: 'bypass', // Don't warn about unhandled requests
            });
            console.log('MSW worker started successfully');
          }
        } catch (error) {
          console.error('Error starting MSW worker:', error);
        }
      }
    };
    
    initMocks();
  }, []);
  
  return (
    <>
      <Head>
        <title>BizInsight Dashboard</title>
        <meta name="description" content="Business Intelligence Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Add favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthProvider>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;