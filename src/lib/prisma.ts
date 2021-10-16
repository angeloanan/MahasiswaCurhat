import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

if (!prisma) {
  prisma = new PrismaClient({
    log: process.env.NODE_ENV === 'production' ? [] : ['error', 'info', 'query', 'warn'],
  })
}

export default prisma
