import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Force dynamic rendering for auth callback and other routes using useSearchParams
  if (path === '/auth/callback' || path.startsWith('/auth/callback/') ||
      path === '/signup-confirmation' || path.startsWith('/signup-confirmation/') ||
      path === '/courses' || path.startsWith('/courses/')) {
    
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-middleware-dynamic', '1');

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/auth/callback/:path*',
    '/signup-confirmation/:path*',
    '/courses/:path*'
  ],
}; 