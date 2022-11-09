import { Request, Response } from 'express'
import prisma from '../lib/prisma'

export const getFollowsByUsername = async (req: Request, res: Response) => {
  const username = req.params.username

  const user = await prisma.user.findUnique({
    where:{ username },
    include: {
      followers: { include: { user: true, followingTo: true } },
      following: { include: { user: true, followingTo: true } },
    }
  })
  
  if( !user ) {
    return res.status(404).json({
      ok: false,
      msg: `no existe el usuario con el username ${username}`
    })
  }

  return res.status(200).json({
    ok: true,
    msg: 'exitoso',
    followers: user.followers,
    following: user.following,
  })
}

export const addFollower = async (req: Request, res: Response) => {
  const usernameToFollow = req.params.username
  const userId = req.userId

  if( !userId ) {
    return res.status(500).json({
      ok: false,
      msg: 'userId dentro de token no encontrado'
    })
  }

  const userToFollow = await prisma.user.findUnique({ where: { username: usernameToFollow }})

  if( !userToFollow ) {
    return res.status(200).json({
      ok: false,
      msg: `no existe el usuario con el nombre ${usernameToFollow}`
    })
  }

  const user = await prisma.user.findUnique({ where: { id: userId }})

  if( !user ) {
    return res.status(200).json({
      ok: false,
      msg: `no existe el usuario con el id ${userId}`
    })
  }

  if( userToFollow.id === userId ) {
    return res.status(400).json({
      ok: false,
      msg: 'El follower y el following no pueden ser el mismo',
    })
  }

  const isThisFollowExist = await prisma.follow.findFirst({
    where: {
      userId: userId,
      followingId: userToFollow.id,
    }
  })

  if( isThisFollowExist ) {
    return res.status(400).json({
      msg: 'El usuario del token ya es seguidor de este usuario',
      ok: false
    })
  }

  try {
    await prisma.follow.create({
      data: {
        userId: userId,
        followingId: userToFollow.id,
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

export const unfollowUser = async (req: Request, res: Response) => {
  const userId = req.userId
  const username = req.params.username

  const user = await prisma.user.findUnique({where: { id: userId }})
  
  if( !user ) {
    return res.status(404).json({
      ok: false,
      msg: `No existe el usuario con el id ${userId}`
    })
  }

  const userToUnfollow = await prisma.user.findUnique({where: { username }})

  if( !userToUnfollow ) {
    return res.status(404).json({
      ok: false,
      msg: `No existe el usuario con el nombre de usuario ${username}`
    })
  }

  try {
    const follow = await prisma.follow.findFirst({
      where: {
        userId,
        followingId: userToUnfollow.id
      }
    })

    if( !follow ) {
      return res.status(400).json({
        ok: false,
        msg: `El usuario no es seguidor de @${username}`
      })
    }

    await prisma.follow.delete({where: { id: follow.id }})

    return res.status(202).json({
      ok: true,
      msg: `Se ha dejado de seguir al usuario ${username}`
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      ok: false,
      msg: 'Ocurrió un error al intentar remover el follow del usuario'
    })
  }
}
