import * as React from 'react'
import NextLink from 'next/link'

import type { GetStaticProps, GetStaticPaths } from 'next'

import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { prisma } from '../../lib/prisma'
import { User } from '.prisma/client'

interface UserPageProps {
  data: Partial<User>
}

export const getStaticProps: GetStaticProps<UserPageProps, { username: string }> = async (
  context,
) => {
  if (context.params?.username == null) return { notFound: true, revalidate: 60 }

  const userDetails = await prisma?.user.findMany({
    where: { username: { equals: context.params.username, mode: 'insensitive' } },
    select: {
      id: true,
      username: true,
      gender: true,
      universityName: true,
      posts: true,
      comments: true,
    },
  })

  if (userDetails == null) return { notFound: true, revalidate: 60 }

  return {
    props: {
      data: userDetails[0],
    },
    revalidate: 300,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const usernames: string[] = ['Angelo']

  return {
    paths: usernames.map((u) => `/user/${u}`),
    fallback: true,
  }
}

const UserPage = (props: UserPageProps) => {
  const router = useRouter()

  // This is only shown when still doing data fetching
  if (router.isFallback) return <div className='mx-auto'>Loading...</div>

  return (
    <div className='w-full mx-auto max-w-prose'>
      <div>You are visiting {props.data.username}&apos;s profile page</div>
      <pre>{JSON.stringify(props.data, null, 2)}</pre>
    </div>
  )
}

export default UserPage
