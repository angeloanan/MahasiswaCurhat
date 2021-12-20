import * as React from 'react'
import NextLink from 'next/link'
import CurhatDisplay from '../components/CurhatDisplay'

import type { GetStaticProps, NextPage } from 'next'
import type { Post, SexualityPronouns } from '@prisma/client'
import type { Merge } from 'type-fest'

import { NextSeo } from 'next-seo'
import { prisma } from '../lib/prisma'
import { useRouter } from 'next/router'
import { differenceInYears } from 'date-fns'

type CustomExplorePageQueryReturnType = Post & {
  author: {
    gender: SexualityPronouns | null
    universityName: string | null
    birthdate: Date | null
  }
  _count: {
    upvote: number
    downvote: number
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
      },
      _count: {
        select: {
          upvote: true,
          downvote: true
        }
      }
    },
    orderBy: {
      timestamp: 'desc'
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
    <>
      <NextSeo title='Explore' />
      <div className='my-8 mx-8 lg:mx-20'>
        <div className='text-2xl font-medium text-gray-700'>Showing all curhats</div>

        <div className='container grid grid-cols-1 gap-4 justify-center items-center mx-auto w-full lg:grid-cols-2'>
          {posts.map((post) => {
            return (
              <div key={post.id} className='flex justify-center w-full'>
                <NextLink href={`/curhat/${post.id}`} passHref>
                  <a className='w-full max-w-prose'>
                    <CurhatDisplay
                      curhatId={post.id}
                      totalKarma={post._count.upvote - post._count.downvote}
                      age={differenceInYears(new Date(), new Date(post.author.birthdate))}
                      content={post.content}
                      gender={post.author.gender}
                      uni={post.author.universityName}
                      className='mt-4 hover:-translate-y-1'
                    />
                  </a>
                </NextLink>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default ExplorePage
