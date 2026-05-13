import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { authClient } from '@/lib/auth-client';

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip proxy for static files, API routes, login, and onboarding itself
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/login') ||
    pathname === '/onboarding' ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // Get session using better-auth client
  const session = await authClient.getSession({
    fetchOptions: {
      headers: {
        cookie: request.headers.get('cookie') || '',
      },
    },
  });

  if (!session.data) {
    // No session, redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Check if user has complete profile
  const user = session.data.user;

  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const hasCompleteProfile =
    user.height !== null &&
    user.weight !== null &&
    user.age !== null &&
    user.bodyFatPercentage !== null;

  if (!hasCompleteProfile) {
    // User profile is incomplete, redirect to onboarding
    return NextResponse.redirect(new URL('/onboarding', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};