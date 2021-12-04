import * as React from 'react'

import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import type { Merge } from 'type-fest'

import { prisma } from '../../lib/prisma'
import { Post } from '.prisma/client'
import { useRouter } from 'next/router'

interface CurhatPageQuery extends NodeJS.Dict<string> {
  id: string
}

interface CurhatPageProps {
  curhatData: Merge<Post, { timestamp: string }>
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<CurhatPageProps, CurhatPageQuery> = async (context) => {
  console.log('GSP Params', context.params)
  const curhatId = context.params?.id

  const curhatData = await prisma.post.findUnique({
    where: {
      id: curhatId,
    },
    rejectOnNotFound: false,
  })

  if (curhatData == null) {
    return {
      notFound: true,
    }
  }

  const transformedCurhatData = {
    ...curhatData,
    timestamp: curhatData?.timestamp.toISOString(),
  }

  return {
    props: {
      curhatData: transformedCurhatData,
    },
    revalidate: 60,
  }
}

const CurhatPage: NextPage<CurhatPageProps> = ({ curhatData }) => {
  const { isFallback } = useRouter()

  return (
    <>
      <div>Curhat Page</div>
      <div className=''>
        Showing info for curhat id: {isFallback ? 'loading...' : curhatData?.id}
      </div>
      <pre>{JSON.stringify(curhatData, null, 2)}</pre>
    </>
  )
}

export default CurhatPage
