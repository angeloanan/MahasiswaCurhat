import NextAuth, { Session, User } from 'next-auth'
import FacebookProvider from 'next-auth/providers/facebook'
import TwitterProvider from 'next-auth/providers/twitter'
import GoogleProvider from 'next-auth/providers/google'

import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '../../../lib/prisma'

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.NEXTAUTH_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXTAUTH_GOOGLE_CLIENT_SECRET!,
      async profile(profile) {
        return {
          id: profile.sub,
          email: profile.email
        }
      }
    }),
    FacebookProvider({
      clientId: process.env.NEXTAUTH_FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.NEXTAUTH_FACEBOOK_CLIENT_SECRET!,
      async profile(profile, tokens) {
        return {
          id: profile.id,
          email: profile.email
        }
      }
    }),
    TwitterProvider({
      clientId: process.env.NEXTAUTH_TWITTER_CLIENT_ID!,
      clientSecret: process.env.NEXTAUTH_TWITTER_CLIENT_SECRET!,
      async profile(profile) {
        return {
          id: profile.id,
          email: profile.email
        }
      }
    })
    // EmailProvider({
    //   // ...
    // })
  ],
  session: {},

  pages: {
    signIn: '/auth/signin',
    newUser: '/auth/newuser',
    signOut: '/auth/signout'
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async session({ session, user }) {
      const userObject = await prisma.user.findUnique({
        where: { id: user.id },
        rejectOnNotFound: false
      })

      session.user.id = user.id
      session.user.username = userObject?.username as string | undefined

      return session
    },
    async redirect({ baseUrl }) {
      return baseUrl
    }
  },

  logger: {
    debug(code, meta) {
      console.debug('[AUTH DEBUG]', code, meta)
    },
    error(code, meta) {
      console.error('[AUTH ERROR]', code, meta)
    },
    warn(code) {
      console.warn('[AUTH WARN]', code)
    }
  }
})
