import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import { getSession } from 'next-auth/react'
import { ZodError } from 'zod'

import { CreateCurhatSchema } from '../../../schemas/Curhat'

async function CreateCurhat(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session || !session.user) {
    res.status(401).json({ status: 401, message: 'Unauthenticated' })
    return
  }

  try {
    const { body } = req
    const curhatDetails = CreateCurhatSchema.parse(body)

    prisma.post.create({
      data: {
        author: {
          connect: {
            id: session.user.id,
          },
        },
        mood: curhatDetails.mood,
        content: curhatDetails.content,
        attachment: curhatDetails.attachment,
      },
    })

    res.status(200).json({ name: 'John Doe' })
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ status: 400, error: error.message })
    }
  }
}

export default CreateCurhat
