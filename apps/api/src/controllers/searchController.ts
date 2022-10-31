import { Request, Response } from 'express'
import prisma from '../lib/prisma'

export const searchQuery = async (req: Request, res: Response) => {
  const { query } = req.params

  const users = await prisma.user.findMany({
    where: {
      OR: [
        {
          username: { contains: query }
        },
        {
          fullname: { contains: query }
        }
      ]
    }
  })

  const posts = await prisma.post.findMany({
    where: {
      content: {
        contains: query,
      }
    },
    include: {
      author: true,
      images: true,
      comments: true,
      likes: {
        include: {
          user: true,
        }
      },
      reposts: true,
    }
  })

  return res.status(200).json({
    ok: true,
    msg: 'ok',
    users,
    posts
  })
}

