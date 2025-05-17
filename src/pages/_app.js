import { useEffect } from 'react';
import Head from 'next/head';
import { AuthProvider } from '../contexts/AuthContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  // Initialize Mock Service Worker in development
  useEffect(() => {
    async function initMocks() {
      if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') {
        return;
      }
      
      try {
        const { worker } = await import('../mocks/browser');
        if (worker) {
          await worker.start({
            onUnhandledRequest: 'bypass',
          });
          console.log('MSW initialized successfully');
        }
      } catch (error) {
        console.error('MSW initialization failed:', error);
      }
    }
    
    initMocks();
  }, []);
  
  return (
    <>
      <Head>
        <title>BizInsight Dashboard</title>
        <meta name="description" content="Business Intelligence Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
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