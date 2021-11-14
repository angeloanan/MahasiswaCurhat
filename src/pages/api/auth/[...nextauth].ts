import NextAuth from 'next-auth'
import FacebookProvider from 'next-auth/providers/facebook'
import TwitterProvider from 'next-auth/providers/twitter'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers'

import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.NEXTAUTH_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXTAUTH_GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.NEXTAUTH_FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.NEXTAUTH_FACEBOOK_CLIENT_SECRET!,
    }),
    TwitterProvider({
      clientId: process.env.NEXTAUTH_TWITTER_CLIENT_ID!,
      clientSecret: process.env.NEXTAUTH_TWITTER_CLIENT_SECRET!,
    }),
    // EmailProvider({
    //   // ...
    // })
  ],
  session: {},

  pages: {
    signIn: '/auth/signin',
    newUser: '/auth/newuser',
    signOut: '/auth/signout',
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
    },
  },
})
