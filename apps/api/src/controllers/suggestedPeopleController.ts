import { Request, Response } from 'express'
import prisma from '../lib/prisma'

export const getSuggestedPeople = async (req: Request, res: Response) => {
  const userId = req.userId

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      following: true,
    }
  })

  if( !user ) {
    return res.status(400).json({
      ok: false,
      msg: `No existe el usuario con el id ${userId}`
    })
  }

  const followingIds = user.following.map( follow => {
    return follow.followingId
  })

  try {
    const users = await prisma.user.findMany({
      where: {
        id: {
          notIn: followingIds,
          not: userId,
        }
      },
      orderBy: {
        followers: {
          _count: 'desc'
        }},
        
      take: 5,
      include: {
        followers: true, following: true
      }
    })
    return res.status(200).json({
      ok: true,
      msg: 'usuarios encontrados',
      users,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      ok: true,
      msg: 'Ocurrió un error al conseguir los usuarios sugeridos',
    })
  }
}
