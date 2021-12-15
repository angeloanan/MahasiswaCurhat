import type { NextApiHandler } from 'next'
import { prisma } from '../../../lib/prisma'
import { getSession } from 'next-auth/react'
import { ZodError } from 'zod'

import { CreateCurhatCommentSchema } from '../../../schemas/CurhatComment'

export type PostCommentCurhatResponse =
  | { status: 200; commentId: string }
  | { status: 400; error: string }
  | { status: 401; error: 'Unauthenticated' }

const CommentCurhat: NextApiHandler<PostCommentCurhatResponse> = async (req, res) => {
  const session = await getSession({ req })
  if (!session || !session.user) {
    res.status(401).json({ status: 401, error: 'Unauthenticated' })
    return
  }

  try {
    const { body } = req
    const commentFields = CreateCurhatCommentSchema.parse(body)

    const comment = await prisma.comment.create({
      data: {
        parentPostId: commentFields.curhatId,
        authorId: session.user.id,
        content: commentFields.content
      }
    })

    res.status(200).json({
      status: 200,
      commentId: comment.id
    })
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ status: 400, error: error.message })
    }
  }
}

export default CommentCurhat
