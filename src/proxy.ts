import { cookies, headers } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { authClient } from '@/lib/auth-client';

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip proxy for static files, API routes, login, and onboarding itself
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/entrar') ||
    pathname === '/primeiros-passos' ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // Get session using better-auth client
  try {
    const session = await authClient.getSession({
      fetchOptions: {
        headers: await headers(),
      },
    });

    if (!session.data) {
      console.error('Error fetching session:', session);
      return NextResponse.redirect(new URL('/entrar', request.url));
    }
    console.error('Error fetching session:', session);
    const user = session.data.user;

    if (!user) {
      return NextResponse.redirect(new URL('/entrar', request.url));
    }

    const hasCompleteProfile =
      user.height !== null &&
      user.weight !== null &&
      user.age !== null &&
      user.bodyFatPercentage !== null;

    if (!hasCompleteProfile) {
      return NextResponse.redirect(new URL('/primeiros-passos', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Error fetching session:', error);
    return NextResponse.redirect(new URL('/entrar', request.url));
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
