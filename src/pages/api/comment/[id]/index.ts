import type { NextApiHandler } from 'next'
import { getSession } from 'next-auth/react'

import nc from '../../../../lib/next-connect'
import { prisma } from '../../../../lib/prisma'

const deleteComment: NextApiHandler = async (req, res) => {
  const commentId = req.query.id as string

  const session = await getSession({ req })
  if (session == null) return res.status(401).json({ status: 401, message: 'Unauthenticated' })

  const comment = await prisma.comment.findFirst({
    where: {
      id: commentId
    },
    select: {
      authorId: true
    },
    rejectOnNotFound: false
  })

  if (comment == null) return res.status(404).json({ status: 404, message: 'Comment not found' })
  if (comment.authorId != session.user.id)
    return res.status(401).json({ status: 403, message: 'Forbidden' })

  await prisma.comment.delete({
    where: {
      id: commentId
    }
  })

  return res.status(200).json({ status: 200, messsage: 'Deleted' })
}

const loveComment: NextApiHandler = async (req, res) => {
  const commentId = req.query.id as string

  const session = await getSession({ req })
  if (session == null) return res.status(401).json({ status: 401, message: 'Unauthenticated' })

  const comment = await prisma.comment.findFirst({
    where: {
      id: commentId
    },
    select: {
      lovedBy: {
        select: {
          id: true
        }
      },
      authorId: true
    },
    rejectOnNotFound: false
  })
  if (comment == null) return res.status(404).json({ status: 404, message: 'Comment not found' })
  if (comment.authorId === session.user.id)
    return res.status(403).json({ status: 403, message: "Author can't heart own comment" })

  const alreadyLoved = comment.lovedBy.map((v) => v.id).includes(session.user.id)
  if (!alreadyLoved) {
    // Create a connection
    await prisma.comment.update({
      where: {
        id: commentId
      },
      data: {
        lovedBy: {
          connect: {
            id: session.user.id
          }
        }
      }
    })
    return res.status(200).json({ status: 200, message: 'Loved' })
  } else {
    // Remove a connection
    await prisma.comment.update({
      where: {
        id: commentId
      },
      data: {
        lovedBy: {
          disconnect: {
            id: session.user.id
          }
        }
      }
    })
    return res.status(200).json({ status: 200, message: 'Unloved' })
  }
}

export default nc.delete(deleteComment).patch(loveComment)
