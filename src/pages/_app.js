import { useEffect } from 'react';
import Head from 'next/head';
import { AuthProvider } from '../contexts/AuthContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  // Initialize Mock Service Worker in both development and production
  useEffect(() => {
    const initMocks = async () => {
      if (typeof window === 'undefined') {
        return;
      }
      
      // No environment check - allow mocks in all environments
      try {
        const { worker } = await import('../mocks/browser');
        // Start the MSW worker
        if (worker) {
          await worker.start({
            onUnhandledRequest: 'bypass'
          });
          console.log('MSW worker started successfully');
        }
      } catch (error) {
        console.error('Error starting MSW worker:', error);
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
