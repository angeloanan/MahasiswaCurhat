import * as React from 'react'

import CurhatDisplay from '../../components/CurhatDisplay'

import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import type { Merge } from 'type-fest'
import type { Post, SexualityPronouns } from '.prisma/client'

import { NextSeo } from 'next-seo'
import { differenceInYears } from 'date-fns'
import { prisma } from '../../lib/prisma'
import { useRouter } from 'next/router'

import { CurhatCommentForm } from '../../components/CurhatComment'
import useSWR, { SWRConfig } from 'swr'
import { CurhatCommentDisplay } from '../../components/CurhatComment/display'

interface CurhatPageQuery extends NodeJS.Dict<string> {
  id: string
}

type CustomCurhatSelection = Post & {
  author: {
    birthdate: Date | null
    gender: SexualityPronouns | null
    universityName: string | null
  }
  _count: {
    downvote: number
    upvote: number
  }
}

interface CustomCurhatCommentResponse {
  id: string
  content: string
  timestamp: string
  author: {
    id: string
    username: string
  }
}

interface CurhatPageProps {
  curhatId: string
  curhatData: Merge<
    CustomCurhatSelection,
    {
      timestamp: string
      author: { birthdate: string; gender: SexualityPronouns; universityName: string }
    }
  >
  fallback: {
    [key: `/api/comment/${string}`]: CustomCurhatCommentResponse[]
  }
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<CurhatPageProps, CurhatPageQuery> = async (context) => {
  const curhatId = context.params?.id as string
  if (curhatId == null) return { notFound: true }

  const curhatData = await prisma.post.findUnique({
    where: {
      id: curhatId
    },
    include: {
      author: {
        select: {
          birthdate: true,
          gender: true,
          universityName: true
        }
      },
      _count: {
        select: {
          downvote: true,
          upvote: true
        }
      }
    },
    rejectOnNotFound: false
  })

  if (curhatData == null) return { notFound: true }

  const curhatComments = await prisma.comment.findMany({
    where: {
      parentPostId: curhatId
    },
    select: {
      id: true,
      content: true,
      timestamp: true,
      author: {
        select: {
          id: true,
          username: true
        }
      }
    },
    orderBy: {
      timestamp: 'asc'
    }
  })

  return {
    props: {
      curhatId: curhatId,
      curhatData: JSON.parse(JSON.stringify(curhatData)),
      fallback: {
        [`/api/comments/${curhatId}`]: JSON.parse(JSON.stringify(curhatComments))
      }
    },
    revalidate: 1
  }
}

interface CurhatCommentLayoutProps {
  curhatId: string
}

const CurhatCommentLayout = ({ curhatId }: CurhatCommentLayoutProps) => {
  const { data: commentData } = useSWR<CustomCurhatCommentResponse[]>(
    `/api/comments/${curhatId}`,
    fetcher
  )

  console.log(commentData)

  if (!commentData) return <div>Loading comments...</div>

  return (
    <div className='flex flex-col gap-3'>
      {commentData?.map((comment) => (
        <CurhatCommentDisplay
          key={comment.id}
          curhatId={curhatId}
          commentId={comment.id}
          timestamp={comment.timestamp}
          authorUsername={comment.author.username}
          authorUserid={comment.author.id}
          content={comment.content}
        />
      ))}
    </div>
  )
}

const CurhatPage: NextPage<CurhatPageProps> = ({ curhatId, curhatData, fallback }) => {
  const { isFallback } = useRouter()

  if (isFallback) {
    return <div className='mx-8 mt-12 lg:mx-20'>Loading...</div>
  }

  return (
    <>
      <NextSeo title={curhatData.content} />
      <SWRConfig value={{ fallback }}>
        <div className='py-12 mx-8 lg:mx-20'>
          <CurhatDisplay
            withInfo
            gender={curhatData.author.gender}
            uni={curhatData.author.universityName}
            age={differenceInYears(new Date(), new Date(curhatData.author.birthdate))}
            content={curhatData.content}
            totalKarma={curhatData._count.upvote - curhatData._count.downvote}
          />

          <CurhatCommentForm replyTo={curhatId} />
          <hr className='my-4' />
          <CurhatCommentLayout curhatId={curhatId} />
        </div>
      </SWRConfig>
    </>
  )
}

export default CurhatPage
