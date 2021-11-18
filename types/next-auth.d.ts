import NextAuth from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /**
       * The user's userid.
       */
      id: string

      /**
       * The user's chosen username
       */
      username?: string

      /**
       * The user's profile picture
       */
      image?: string
    }
  }

  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    id: string
  }

  /** The OAuth profile returned from your provider */
  interface Profile {}
}
