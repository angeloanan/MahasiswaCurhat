import { PrismaClient } from '@prisma/client'

// https://github.com/prisma/prisma/issues/1983#issuecomment-620621213

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: ['error', 'info', 'query', 'warn'],
    })
  }

  prisma = global.prisma
}

export default prisma
