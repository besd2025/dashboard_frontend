import { NextResponse } from 'next/server';

export function middleware(request) {
  const access_token = request.cookies.get('accessToken')?.value;
  if (!access_token) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'], // bloque /dashboard/home et ses sous-pages
};