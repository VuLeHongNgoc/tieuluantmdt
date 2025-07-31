import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Admin routes protection
  if (pathname.startsWith('/admin')) {
    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET 
    })

    // Check if user is authenticated and has admin role
    if (!token || token.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/auth/login?error=unauthorized', request.url))
    }
  }

  // Auth routes protection (prevent authenticated users from accessing login/register)
  if (pathname.startsWith('/auth') && pathname !== '/auth/logout') {
    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET 
    })

    if (token) {
      // Redirect admin users to admin dashboard
      if (token.role === 'ADMIN') {
        return NextResponse.redirect(new URL('/admin', request.url))
      }
      // Redirect regular users to homepage
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/auth/:path*',
  ]
}