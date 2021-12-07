import * as React from 'react'

import CurhatDisplay from '../../components/CurhatDisplay'

import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import type { Merge } from 'type-fest'
import type { Post, SexualityPronouns } from '.prisma/client'

import { NextSeo } from 'next-seo'
import { differenceInYears } from 'date-fns'
import { prisma } from '../../lib/prisma'
import { useRouter } from 'next/router'

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

interface CurhatPageProps {
  curhatData: Merge<
    CustomCurhatSelection,
    {
      timestamp: string
      author: { birthdate: string; gender: SexualityPronouns; universityName: string }
    }
  >
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<CurhatPageProps, CurhatPageQuery> = async (context) => {
  const curhatId = context.params?.id

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

  if (curhatData == null) {
    return {
      notFound: true
    }
  }

  const transformedCurhatData = JSON.parse(JSON.stringify(curhatData))

  return {
    props: {
      curhatData: transformedCurhatData
    },
    revalidate: 60
  }
}

const CurhatPage: NextPage<CurhatPageProps> = ({ curhatData }) => {
  const { isFallback } = useRouter()

  if (isFallback) {
    return <div className='mx-8 mt-12 lg:mx-20'>Loading...</div>
  }

  return (
    <>
      <NextSeo title={curhatData.content} />
      <div className='mx-8 mt-12 lg:mx-20'>
        <CurhatDisplay
          withInfo
          gender={curhatData.author.gender}
          uni={curhatData.author.universityName}
          age={differenceInYears(new Date(), new Date(curhatData.author.birthdate))}
          content={curhatData.content}
          totalKarma={curhatData._count.upvote - curhatData._count.downvote}
        />

        <div className=''>Showing info for curhat id: {curhatData?.id}</div>
        <pre className='overflow-scroll'>{JSON.stringify(curhatData, null, 2)}</pre>
      </div>
    </>
  )
}

export default CurhatPage
