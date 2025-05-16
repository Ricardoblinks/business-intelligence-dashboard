import { NextResponse } from 'next/server';

export function middleware(request) {
  // Get the path of the request
  const { pathname } = request.nextUrl;
  
  // Check if the path is protected
  const isProtectedRoute = pathname.startsWith('/dashboard') || 
                          pathname.startsWith('/analytics') || 
                          pathname.startsWith('/settings') ||
                          pathname.startsWith('/customers') ||
                          pathname.startsWith('/reports');
  
  // Check auth status from the cookies or localStorage
  // Note: localStorage is not accessible in middleware, so we use cookies
  const token = request.cookies.get('token')?.value;
  
  // If it's a protected route and there's no token, redirect to login
  if (isProtectedRoute && !token) {
    const url = new URL('/login', request.url);
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }
  
  // If it's login or register and user is already logged in, redirect to dashboard
  if ((pathname === '/login' || pathname === '/register' || pathname === '/') && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // Continue with the request otherwise
  return NextResponse.next();
}

// Specify which routes this middleware will run on
export const config = {
  matcher: [
    '/',
    '/dashboard/:path*', 
    '/login', 
    '/register', 
    '/settings/:path*', 
    '/analytics/:path*',
    '/customers/:path*',
    '/reports/:path*'
  ],
};