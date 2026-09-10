import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);
  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  if (
    !pathname.startsWith('/admin') ||
    pathname === '/admin/login'
  ) {
    return response;
  }

  const hasAccessToken = Boolean(
    request.cookies.get('portfolio-access-token')?.value,
  );
  const hasRefreshToken = Boolean(
    request.cookies.get('portfolio-refresh-token')?.value,
  );

  if (!hasAccessToken || !hasRefreshToken) {
    return NextResponse.redirect(
      new URL('/admin/login', request.url),
    );
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*'],
};
