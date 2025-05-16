// src/mocks/handlers.js
// API request handlers for Mock Service Worker

import { rest } from 'msw';
import { generateToken } from '../utils/auth';

// Mock database
const mockUsers = [
  {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
  }
];

export const handlers = [
  // Login handler
  rest.post('/api/auth/login', (req, res, ctx) => {
    const { email, password, rememberMe } = req.body;
    
    // Find user
    const user = mockUsers.find(u => u.email === email);
    
    // Check credentials
    if (!user || user.password !== password) {
      return res(
        ctx.status(401),
        ctx.json({ error: 'Invalid email or password' })
      );
    }
    
    // Generate token
    const token = generateToken();
    
    return res(
      ctx.status(200),
      ctx.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000, // 30 days or 1 hour
      }),
      ctx.json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token
      })
    );
  }),
  
  // Register handler
  rest.post('/api/auth/register', (req, res, ctx) => {
    const { email, password, name } = req.body;
    
    // Check if user already exists
    if (mockUsers.some(u => u.email === email)) {
      return res(
        ctx.status(400),
        ctx.json({ error: 'User already exists' })
      );
    }
    
    // Create new user
    const newUser = {
      id: mockUsers.length + 1,
      name,
      email,
      password,
    };
    
    mockUsers.push(newUser);
    
    return res(
      ctx.status(201),
      ctx.json({
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        }
      })
    );
  }),
  
  // Logout handler
  rest.post('/api/auth/logout', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0),
      }),
      ctx.json({ success: true })
    );
  }),
];