import { NextResponse } from 'next/server';

export function middleware(request) {
  if (request.nextUrl.pathname === '/protected') {
    const apiKey = request.cookies.get('apiKey');
    
    if (!apiKey?.value) {
      return NextResponse.redirect(new URL('/playground', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/protected',
}; 