import type { NextApiRequest, NextApiResponse } from 'next'
import { ZodError } from 'zod'
import { getSession } from 'next-auth/react'

import { prisma } from '../../lib/prisma'
import { NewUserFormSchema } from '../../schemas/NewUserForm'

async function NewUser(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session || !session.user) {
    res.status(401).json({ status: 401, message: 'Unauthenticated' })
    return
  }

  try {
    const { body } = req
    const formData = NewUserFormSchema.parse(body)

    const findUsername = await prisma.user.findMany({
      where: { username: { mode: 'insensitive', equals: formData.username } }
    })

    if (findUsername.length > 0) {
      throw new Error('Username already exists')
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        username: formData.username,
        gender: formData.gender,
        birthdate: formData.birthdate,
        university: {
          connectOrCreate: {
            create: {
              name: formData.university
            },
            where: {
              name: formData.university
            }
          }
        }
      }
    })

    res.status(200).json({ status: 200, message: 'Success' })
  } catch (error) {
    console.error('[API] /newuser', error)

    if (error instanceof ZodError) {
      res.status(400).json({ status: 400, error: error.message })
    } else if (error instanceof Error) {
      res.status(500).json({ status: 500, error: error.message })
    } else {
      res.status(500).json({ status: 500, error: error })
    }
  }
}

export default NewUser
