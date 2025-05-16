import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import RegisterForm from '../components/auth/RegisterForm';
import useAuth from '../hooks/useAuth';

const RegisterPage = () => {
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
        <title>Register | BizInsight Dashboard</title>
        <meta name="description" content="Create your BizInsight Dashboard account" />
      </Head>
      <RegisterForm />
    </>
  );
};

export default RegisterPage;