import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { getMemberByEmail, isAllowedMember } from '@/lib/members-db'

declare module 'next-auth' {
  interface Session {
    user: {
      name?: string | null
      email?: string | null
      image?: string | null
      role?: string
      systemRole?: string
      avatar?: string
    }
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'dummy-google-client-id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'dummy-google-client-secret',
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user?.email) return false
      // Strict Whitelist Check: User's Google email must be in MongoDB MEMBER_WHITELIST
      return await isAllowedMember(user.email)
    },
    async session({ session }) {
      if (session?.user?.email) {
        const member = await getMemberByEmail(session.user.email)
        if (member) {
          session.user.role = member.role
          session.user.systemRole = member.systemRole
          session.user.avatar = member.avatar || session.user.image || undefined
        }
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
    error: '/unauthorized',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET || 'gdg-bgu-secret-key-change-in-production',
}
