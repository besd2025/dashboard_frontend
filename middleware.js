import { NextResponse } from 'next/server';
export function middleware(request) {
  const token = request.cookies.get('accessToken');

  // Évite de bloquer la page d'accueil elle-même
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/fff/:path*'],
};
