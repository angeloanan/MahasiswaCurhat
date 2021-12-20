import * as React from 'react'

import type { GetStaticProps, GetStaticPaths, NextPage } from 'next'
import type { SexualityPronouns } from '.prisma/client'

import Image from 'next/image'
import NextLink from 'next/link'
import ProfileBG from '../../public/profilebg.jpeg'

import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { prisma } from '../../lib/prisma'
import { differenceInYears, formatDistance } from 'date-fns'
import Button from '../../components/UI/Button'

interface UserPageProps {
  data: {
    id: string
    username: string | null
    gender: SexualityPronouns | null
    universityName: string | null
    birthdate: string | null
    registeredAt: string
    _count: {
      posts: number
      comments: number
    }
  }
  totalPostKarma: number
  totalCommentKarma: number
}

export const getStaticPaths: GetStaticPaths = async () => {
  // const usernames = await prisma.user.findMany({ take: 100, select: { username: true } })

  return {
    // paths: usernames.filter((u) => u != null).map((u) => `/user/${u}`),
    paths: [],
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<UserPageProps, { username: string }> = async (
  context
) => {
  const username = context.params?.username
  if (username == null) return { notFound: true, revalidate: 60 }
  if (username === 'null')
    return {
      // redirect: { destination: '/auth/newuser', permanent: 'false' },
      notFound: true
    }

  try {
    const userDetails = await prisma.user.findMany({
      where: { username: { equals: username, mode: 'insensitive' } },
      select: {
        id: true,
        username: true,
        gender: true,
        universityName: true,
        birthdate: true,
        registeredAt: true,
        _count: {
          select: {
            posts: true,
            comments: true
          }
        }
      }
    })
    if (userDetails == null) return { notFound: true, revalidate: 300 }

    let userPostKarmaTotal = 0
    let userPostCommentKarmaTotal = 0
    await Promise.all([
      async () => {
        const userPostKarmaAggregate = await prisma.post.findMany({
          where: {
            author: { username: { equals: username, mode: 'insensitive' } }
          },
          select: {
            _count: {
              select: { upvote: true, downvote: true }
            }
          }
        })
        userPostKarmaAggregate.forEach(
          (post) => (userPostKarmaTotal += post._count.upvote - post._count.downvote)
        )
      },
      async () => {
        const userPostCommentKarmaAggregate = await prisma.comment.findMany({
          where: {
            author: { username: { equals: username, mode: 'insensitive' } }
          },
          select: {
            _count: {
              select: {
                lovedBy: true
              }
            }
          }
        })

        userPostCommentKarmaAggregate.forEach(
          (c) => (userPostCommentKarmaTotal += c._count.lovedBy)
        )
      }
    ])

    return {
      props: {
        data: JSON.parse(JSON.stringify(userDetails[0])),
        totalPostKarma: userPostKarmaTotal,
        totalCommentKarma: userPostCommentKarmaTotal
      },
      revalidate: 300
    }
  } catch (e) {
    console.error(e)
    return { notFound: true, revalidate: 300 }
  }
}

const UserPage: NextPage<UserPageProps> = (props) => {
  const router = useRouter()

  const userPfp = `https://source.boringavatars.com/beam/256/${encodeURIComponent(
    router.isFallback ? 'null' : (props.data.id as string)
  )}}`

  // This is only shown when still doing data fetching
  if (router.isFallback) return <div className='mx-auto'>Loading...</div>

  return (
    <>
      <NextSeo title={`${props.data.username}'s Profile`} />

      <div className='flex relative justify-center items-center p-6 h-64 sm:p-12 bg-slate-800'>
        <Image
          priority
          src={ProfileBG}
          placeholder='blur'
          layout='fill'
          objectFit='cover'
          className='select-none !brightness-[30%]'
          alt=''
        />
        <div className='flex relative flex-col content-between w-full max-w-6xl sm:flex-row'>
          {/* Left side */}
          <div className='flex relative flex-1 items-center w-full h-32'>
            <div className='relative mr-9 w-32 h-32'>
              <Image
                src={userPfp}
                layout='fill'
                className='rounded-full'
                alt={`${props.data.username}'s profile picture`}
              />
            </div>
            <div className='flex flex-col justify-around h-full font-medium text-gray-300'>
              <div className='text-lg'>
                <div className='text-3xl font-bold text-gray-100'>{props.data.username}</div>
                <div>{props.data.universityName} Student</div>
                <div>
                  {props.data.gender === 'MALE' ? 'Male' : 'Female'},{' '}
                  {differenceInYears(new Date(), new Date(props.data.birthdate as string))} years
                  old
                </div>
              </div>
              <div className='text-sm'>
                Joined {formatDistance(new Date(props.data.registeredAt), new Date())} ago
              </div>
            </div>
          </div>
          {/* Right side */}
          <div className='flex flex-col items-end pt-4 pb-2 w-full sm:w-auto'>
            <div>
              <NextLink href='/auth/signout'>
                <a>
                  <Button>Log out</Button>
                </a>
              </NextLink>
            </div>
          </div>
        </div>
      </div>

      <div className='px-4'>
        <div className='mx-auto mt-8 w-full max-w-prose'>
          This user has posted {props.data._count.posts} curhats with a total karma of{' '}
          {props.totalPostKarma} points.
        </div>
        <div className='mx-auto mt-2 w-full max-w-prose'>
          In addition, they have commented {props.data._count.comments} times which accumulated{' '}
          {props.totalCommentKarma} hearts!
        </div>
      </div>
    </>
  )
}

export default UserPage
