import { rest } from 'msw';

// Mock data
const mockUsers = {
  total: 12489,
  new: 385,
  active: 8945,
  growth: 18.7
};

const mockSales = {
  thisMonth: 286400,
  lastMonth: 245800,
  growth: 16.5,
  data: [
    { id: 1, customer: 'Acme Corp', amount: 12500, date: '2025-05-15', status: 'Completed' },
    { id: 2, customer: 'TechGiant Inc', amount: 8750, date: '2025-05-14', status: 'Completed' },
    { id: 3, customer: 'Global Services', amount: 15000, date: '2025-05-14', status: 'Pending' },
    { id: 4, customer: 'StartUp Labs', amount: 4200, date: '2025-05-13', status: 'Completed' },
    { id: 5, customer: 'Enterprise Solutions', amount: 18600, date: '2025-05-12', status: 'Failed' },
    { id: 6, customer: 'Digital Innovations', amount: 9300, date: '2025-05-11', status: 'Pending' },
    { id: 7, customer: 'Future Systems', amount: 6700, date: '2025-05-10', status: 'Completed' },
    { id: 8, customer: 'Smart Technologies', amount: 11200, date: '2025-05-09', status: 'Completed' },
    { id: 9, customer: 'Quantum Industries', amount: 21500, date: '2025-05-08', status: 'Pending' },
    { id: 10, customer: 'InnovateTech', amount: 8900, date: '2025-05-07', status: 'Completed' }
  ]
};

const mockSessions = {
  total: 34568,
  active: 1243,
  average: 14.2,
  bounce: 32.8
};

const mockSalesTrend = [
  { month: 'May', sales: 286400 },
  { month: 'Apr', sales: 245800 },
  { month: 'Mar', sales: 267900 },
  { month: 'Feb', sales: 198700 },
  { month: 'Jan', sales: 178500 },
  { month: 'Dec', sales: 290400 },
  { month: 'Nov', sales: 233600 },
  { month: 'Oct', sales: 205700 },
  { month: 'Sep', sales: 187300 },
  { month: 'Aug', sales: 152900 },
  { month: 'Jul', sales: 167400 },
  { month: 'Jun', sales: 193500 }
];

const mockUserGrowth = [
  { month: 'May', users: 1285 },
  { month: 'Apr', users: 1176 },
  { month: 'Mar', users: 1089 },
  { month: 'Feb', users: 935 },
  { month: 'Jan', users: 873 },
  { month: 'Dec', users: 1122 },
  { month: 'Nov', users: 978 },
  { month: 'Oct', users: 845 },
  { month: 'Sep', users: 786 },
  { month: 'Aug', users: 721 },
  { month: 'Jul', users: 690 },
  { month: 'Jun', users: 745 }
];

const mockRevenueByCategory = [
  { name: 'Software', value: 145800 },
  { name: 'Hardware', value: 93600 },
  { name: 'Services', value: 118200 },
  { name: 'Training', value: 65400 },
  { name: 'Support', value: 42300 }
];

// API handlers
export const handlers = [
  // Users endpoints
  rest.get('/api/users', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(mockUsers)
    );
  }),

  // Sales endpoints
  rest.get('/api/sales', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(mockSales)
    );
  }),

  // Sessions endpoints
  rest.get('/api/sessions', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(mockSessions)
    );
  }),

  // Sales trend endpoint
  rest.get('/api/sales/trend', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(mockSalesTrend)
    );
  }),

  // User growth endpoint
  rest.get('/api/users/growth', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(mockUserGrowth)
    );
  }),

  // Revenue by category endpoint
  rest.get('/api/revenue/categories', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(mockRevenueByCategory)
    );
  }),
  
  // Auth endpoints (for completeness)
  rest.post('/api/auth/login', (req, res, ctx) => {
    const { email, password } = req.body;
    
    // This is just a mock - in real app, you'd validate credentials
    if (email === 'test@example.com' && password === 'password123') {
      return res(
        ctx.status(200),
        ctx.json({
          token: 'mock-jwt-token',
          user: {
            id: 1,
            name: 'Test User',
            email: 'test@example.com'
          }
        })
      );
    }
    
    return res(
      ctx.status(401),
      ctx.json({
        message: 'Invalid credentials'
      })
    );
  }),
  
  rest.post('/api/auth/register', async (req, res, ctx) => {
    const { name, email, password } = await req.json();
    
    // In a real app, you'd validate and store the user
    return res(
      ctx.status(201),
      ctx.json({
        message: 'User registered successfully',
        user: {
          id: Math.floor(Math.random() * 1000) + 2,
          name,
          email
        }
      })
    );
  })
];