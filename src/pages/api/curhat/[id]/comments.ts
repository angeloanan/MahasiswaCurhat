import type { NextApiHandler } from 'next'

import { prisma } from '@lib/prisma'
import { ZodError } from 'zod'

export type FetchCurhatCommentResponse =
  | {
      author: { username: string | null; id: string }
      id: string
      content: string
      timestamp: string
    }[]
  | { status: 400; error: string }

const FetchCurhatComment: NextApiHandler<FetchCurhatCommentResponse> = async (req, res) => {
  try {
    const curhatId = req.query['id'] as string
    const comments = await prisma.comment.findMany({
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
      }
    })

    res.status(200).json(JSON.parse(JSON.stringify(comments)))
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ status: 400, error: error.message })
    }
  }
}

export default FetchCurhatComment
