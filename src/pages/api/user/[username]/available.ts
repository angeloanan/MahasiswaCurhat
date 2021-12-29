import { NextApiHandler } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from '@lib/prisma'
import nc from '@lib/next-connect'

export type AVAILABILITY = 'AVAILABLE' | 'UNAVAILABLE'
export type isUsernameAvailableResponse =
  | { status: AVAILABILITY }
  | { status: number; message: string }

const isUsernameAvailable: NextApiHandler<isUsernameAvailableResponse> = async (req, res) => {
  const username = req.query['username'] as string
  const findUsername = await prisma.user.findMany({
    where: { username: { mode: 'insensitive', equals: username } }
  })

  res.status(200).json({ status: findUsername.length === 0 ? 'AVAILABLE' : 'UNAVAILABLE' })
}

export default nc.get(isUsernameAvailable)
