import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import LoginForm from '../components/auth/LoginForm';
import useAuth from '../hooks/useAuth';

const LoginPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  
  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);
  
  return (
    <>
      <Head>
        <title>Login | BizInsight Dashboard</title>
        <meta name="description" content="Login to your BizInsight Dashboard" />
      </Head>
      <LoginForm />
    </>
  );
};

export default LoginPage;