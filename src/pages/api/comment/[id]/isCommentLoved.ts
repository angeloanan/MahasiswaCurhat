import type { NextApiHandler } from 'next'

import { prisma } from '@lib/prisma'
import { getSession } from 'next-auth/react'

export type FetchCurhatCommentLovedResponse =
  | { loved: boolean }
  | { status: 404; error: string }
  | { status: 401; error: 'Unauthenticated' }

const FetchCurhatCommentLoved: NextApiHandler<FetchCurhatCommentLovedResponse> = async (
  req,
  res
) => {
  const session = await getSession({ req })
  if (!session || !session.user) {
    res.status(401).json({ status: 401, error: 'Unauthenticated' })
    return
  }

  const commentId = req.query['id'] as string
  const comment = await prisma.comment.findFirst({
    where: {
      id: commentId
    },
    select: {
      lovedBy: {
        select: {
          id: true
        }
      }
    },
    rejectOnNotFound: false
  })
  if (comment == null) return res.status(404).json({ status: 404, error: 'Comment not found' })

  const userAlreadyLoved = comment.lovedBy.map((u) => u.id).includes(session.user.id)
  res.status(200).json({ loved: userAlreadyLoved })
}

export default FetchCurhatCommentLoved
