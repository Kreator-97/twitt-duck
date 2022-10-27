import { Request, Response } from 'express'
import prisma from '../lib/prisma'

export const addFollower = async (req: Request, res: Response) => {
  const userIdToFollow = req.params.userIdToFollow
  const userId = req.userId

  if( !userId ) {
    return res.status(500).json({
      ok: false,
      msg: 'userId dentro de token no encontrado'
    })
  }

  const userToFollow = await prisma.user.findUnique({ where: { id: userIdToFollow }})

  if( !userToFollow ) {
    return res.status(200).json({
      ok: false,
      msg: `no existe el usuario con el id ${userIdToFollow}`
    })
  }

  const user = await prisma.user.findUnique({ where: { id: userId }})

  if( !user ) {
    return res.status(200).json({
      ok: false,
      msg: `no existe el usuario con el id ${userId}`
    })
  }

  if( userIdToFollow === userId ) {
    return res.status(400).json({
      ok: false,
      msg: 'El follower y el following no pueden ser el mismo',
    })
  }

  const isThisFollowExist = await prisma.follow.findFirst({
    where: {
      userId: userId,
      followingId: userIdToFollow,
    }
  })

  if( isThisFollowExist ) {
    return res.status(400).json({
      msg: 'El usuario ya es seguidor de este usuario a seguir',
      ok: false
    })
  }

  try {
    await prisma.follow.create({
      data: {
        userId: userId,
        followingId: userIdToFollow,
      }
    })

    return res.status(200).json({
      ok: true,
      msg: 'Follow realizado correctamente'
    })

  } catch (error) {
    console.error(error)
    return res.status(200).json({
      ok: true,
      msg: 'Ocurrio un error al realizar el follow'
    })
  }
}
