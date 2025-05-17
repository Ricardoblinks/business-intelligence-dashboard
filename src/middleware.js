import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  const isProtectedRoute = pathname.startsWith('/dashboard') || 
                          pathname.startsWith('/analytics') || 
                          pathname.startsWith('/settings') ||
                          pathname.startsWith('/customers') ||
                          pathname.startsWith('/reports');
  
  const token = request.cookies.get('token')?.value || '';
  
  if (isProtectedRoute && !token) {
    const url = new URL('/login', request.url);
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }
  
  if ((pathname === '/login' || pathname === '/register' || pathname === '/') && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return NextResponse.next();
}

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