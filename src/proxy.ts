import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

const SESSION_COOKIE_NAME = 'gdg_member_session'
const secret = process.env.NEXTAUTH_SECRET || 'gdg-bgu-secret-key-change-in-production'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/admin')) {
    let isAuthorized = false

    try {
      const token = await getToken({ req: request, secret })
      if (token?.email) {
        isAuthorized = true
      }
    } catch {
      isAuthorized = false
    }

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
  matcher: ['/admin', '/admin/:path*'],
}
