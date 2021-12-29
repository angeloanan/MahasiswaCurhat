import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@lib/prisma'

async function Universities(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const universities = await prisma.university.findMany({
      select: { name: true, students: false }
    })

    res.status(200).json(universities.map((university) => university.name))
  } catch (error) {
    res.status(500).json({ status: 500, error: error })
  }
}

export default Universities
