import * as React from 'react'
import NextLink from 'next/link'
import CurhatDisplay from '../components/CurhatDisplay'

import type { GetStaticProps, NextPage } from 'next'
import type { Post, SexualityPronouns } from '@prisma/client'
import type { Merge } from 'type-fest'

import { prisma } from '../lib/prisma'
import { useRouter } from 'next/router'
import { differenceInYears } from 'date-fns'

type CustomExplorePageQueryReturnType = Post & {
  author: {
    gender: SexualityPronouns | null
    universityName: string | null
    birthdate: Date | null
  }
}

type TransformedCustomExplorePageQueryReturnType = Merge<
  CustomExplorePageQueryReturnType,
  {
    timestamp: string
    author: { birthdate: string; gender: SexualityPronouns; universityName: string }
  }
>

interface ExplorePageProps {
  posts: TransformedCustomExplorePageQueryReturnType[]
}

export const getStaticProps: GetStaticProps<ExplorePageProps> = async () => {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          gender: true,
          universityName: true,
          birthdate: true
        }
      }
    },
    take: 20
  })

  const transformedPosts = JSON.parse(
    JSON.stringify(posts)
  ) as TransformedCustomExplorePageQueryReturnType[]

  return {
    props: {
      posts: transformedPosts
    },
    revalidate: 60
  }
}

const ExplorePage: NextPage<ExplorePageProps> = ({ posts }) => {
  const { isFallback } = useRouter()

  if (isFallback) return <div>Loading curhat...</div>

  return (
    <div className='mx-20 my-8'>
      <div className='text-2xl font-medium text-gray-700'>Showing all curhats</div>

      {posts.map((post) => {
        return (
          <NextLink href={`/curhat/${post.id}`} key={post.id} passHref>
            <a>
              <CurhatDisplay
                age={differenceInYears(new Date(), new Date(post.author.birthdate))}
                content={post.content}
                gender={post.author.gender}
                uni={post.author.universityName}
              />
            </a>
          </NextLink>
        )
      })}
    </div>
  )
}

export default ExplorePage
