import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

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

  // Get session cookie
  const sessionCookie = request.cookies.get('better-auth.session_token');

  if (!sessionCookie) {
    // No session, redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Check if user has complete profile
  // Make API call to check user profile data
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL!;
  const checkUrl = `${baseUrl}/users/me`;

  try {
    const response = await fetch(checkUrl, {
      headers: {
        Cookie: `better-auth.session_token=${sessionCookie.value}`,
      },
      credentials: 'include',
    });

    if (response.ok) {
      const user = await response.json();

      const hasCompleteProfile =
        user.height !== null &&
        user.weight !== null &&
        user.age !== null &&
        user.bodyFatPercentage !== null;

      if (!hasCompleteProfile) {
        // User profile is incomplete, redirect to onboarding
        return NextResponse.redirect(new URL('/onboarding', request.url));
      }
    }
  } catch {
    // If API call fails, allow request to continue
    // The page will handle the error
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};