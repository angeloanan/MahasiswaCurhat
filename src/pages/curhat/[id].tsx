import * as React from 'react'

import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import type { Merge } from 'type-fest'
import type { Post, SexualityPronouns } from '.prisma/client'

import { differenceInYears } from 'date-fns'
import { prisma } from '../../lib/prisma'
import { useRouter } from 'next/router'
import CurhatDisplay from '../../components/CurhatDisplay'

interface CurhatPageQuery extends NodeJS.Dict<string> {
  id: string
}

type CustomCurhatSelection = Post & {
  author: {
    birthdate: Date | null
    gender: SexualityPronouns | null
    universityName: string | null
  }
}

interface CurhatPageProps {
  curhatData: Merge<
    CustomCurhatSelection,
    {
      timestamp: string
      author: { birthDate: string; gender: SexualityPronouns; universityName: string }
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
    return <div className='mx-20 mt-8'>Loading...</div>
  }

  return (
    <div className='mx-20 mt-8'>
      <CurhatDisplay
        gender={curhatData.author.gender}
        uni={curhatData.author.universityName}
        age={differenceInYears(new Date(), new Date(curhatData.author.birthDate))}
        content={curhatData.content}
      />

      <div className=''>
        Showing info for curhat id: {isFallback ? 'loading...' : curhatData?.id}
      </div>
      <pre>{JSON.stringify(curhatData, null, 2)}</pre>
    </div>
  )
}

export default CurhatPage
