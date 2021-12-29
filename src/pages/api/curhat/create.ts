import type { NextApiHandler } from 'next'
import { prisma } from '@lib/prisma'
import { getSession } from 'next-auth/react'
import { ZodError } from 'zod'

import { CreateCurhatSchema } from '@schema/Curhat'

export type CurhatCreateResponse =
  | { status: 200; postId: string }
  | { status: 400; error: string }
  | { status: 401; error: string }

const CreateCurhat: NextApiHandler<CurhatCreateResponse> = async (req, res) => {
  const session = await getSession({ req })
  if (!session || !session.user) {
    res.status(401).json({ status: 401, error: 'Unauthenticated' })
    return
  }

  try {
    const { body } = req
    const curhatDetails = CreateCurhatSchema.parse(body)

    const post = await prisma.post.create({
      data: {
        author: {
          connect: {
            id: session.user.id
          }
        },
        mood: curhatDetails.mood,
        content: curhatDetails.content
        // attachment: curhatDetails.attachment
      }
    })

    res.status(200).json({
      status: 200,
      postId: post.id
    })
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ status: 400, error: error.message })
    }
  }
}

export default CreateCurhat
