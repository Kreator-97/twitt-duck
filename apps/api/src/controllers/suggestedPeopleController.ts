import { Request, Response } from 'express'
import prisma from '../lib/prisma'

export const getSuggestedPeople = async (req: Request, res: Response) => {

  try {
    const users = await prisma.user.findMany({
      orderBy: { followers: {
        _count: 'desc'
      } },
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
