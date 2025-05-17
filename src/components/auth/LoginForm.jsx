import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AuthLayout from './AuthLayout';
import useAuth from '../../hooks/useAuth';
import Input from '../ui/Input';
import Button from '../ui/Button';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: 'hr@branddrive.co',
    password: 'password123',   
    rememberMe: false
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  
  React.useEffect(() => {
    if (router.query.registered === 'true') {
      setRegistrationSuccess(true);
    }
  }, [router.query]);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const { email, password, rememberMe } = formData;
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      setIsSubmitting(true);
      await login(email, password, rememberMe);
      router.push('/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout 
      title="Sign in to your account" 
      subtitle="Or create a new account if you don't have one"
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-50 dark:bg-red-900 border-l-4 border-red-500 p-4">
            <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
          </div>
        )}
        
        {registrationSuccess && (
          <div className="bg-green-50 dark:bg-green-900 border-l-4 border-green-500 p-4">
            <p className="text-sm text-green-700 dark:text-green-200">
              Registration successful! You can now log in with your credentials.
            </p>
          </div>
        )}
        
        <div>
          <Input
            label="Email address"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <Input
            label="Password"
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="rememberMe"
              name="rememberMe"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
              Keep me logged in
            </label>
          </div>

          <div className="text-sm">
            <Link 
              href="#" 
              className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
            >
              Forgot your password?
            </Link>
          </div>
        </div>
        
        <div className="text-xs text-gray-500 dark:text-gray-400 -mt-2">
          {!formData.rememberMe && (
            <p>
              You will be automatically logged out after 1 minute of inactivity.
            </p>
          )}
        </div>

        <div>
          <Button
            type="submit"
            fullWidth
            isLoading={isSubmitting}
          >
            Sign in
          </Button>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link 
              href="/register" 
              className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default LoginForm;