import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

const SESSION_COOKIE_NAME = 'gdg_member_session'
const secret = process.env.NEXTAUTH_SECRET || 'gdg-bgu-secret-key-change-in-production'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect /admin routes
  if (pathname.startsWith('/admin')) {
    let isAuthorized = false

    // 1. Check NextAuth JWT token
    try {
      const token = await getToken({ req: request, secret })
      if (token?.email) {
        isAuthorized = true
      }
    } catch {
      isAuthorized = false
    }

    // 2. Fallback check for session cookie
    if (!isAuthorized) {
      const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value
      if (sessionCookie) {
        try {
          const data = JSON.parse(sessionCookie)
          if (data.email) {
            isAuthorized = true
          }
        } catch {
          isAuthorized = false
        }
      }
    }

    if (!isAuthorized) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
