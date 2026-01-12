import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const tokenObj = request.cookies.get('auth_token');
  const token = tokenObj?.value;

  const hasValidToken = token && token !== 'undefined' && token !== '';

  const { pathname } = request.nextUrl;
  const protectedPaths = ['/cart', '/wishlist', '/profile'];

  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (isProtected && !hasValidToken) {
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('auth_token'); 
    return response;
  }

  

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/cart/:path*', 
    '/wishlist/:path*', 
    '/profile/:path*', 
    '/login', 
    '/signup'
  ],
};