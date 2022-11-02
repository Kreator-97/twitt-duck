import { Request, Response } from 'express'
import { Notification } from '@prisma/client'

import prisma from '../lib/prisma'
import { NotificationInfo } from '../interfaces'

export const createLikeNotification = async (notificationInfo: NotificationInfo, userId: string): Promise<Notification> => {
  const { type, id } = notificationInfo

  if( type === 'post' ) {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: true,
      }
    })

    if( !post ) {
      console.log({post})
      return Promise.reject('No se pudo crear la notificación. Post no existe')
    }
    if( !post.author ) {
      return Promise.reject('No se pudo crear la notificación. Author no encontrado no existe')
    }

    try {
      const notification = await prisma.notification.create({
        data: {
          title: `Al usuario @${post?.author?.username} le ha gustado tu publicación`,
          userId: post.author.id,
          fromUserId: userId,
          type: 'POST',
          postId: id
        }
      })
      return notification
    } catch (error) {
      console.error(error)
    }
  }

  return Promise.reject('No se pudo crear la notificación. Post no existe')
}

export const removeNotification = async (notification: NotificationInfo, userId: string):Promise<Notification| null> => {
  const { type, id } = notification

  if( type === 'post') {
    const notification = await prisma.notification.findFirst({
      where: {
        type: 'POST',
        postId: id,
        fromUserId: userId
      }
    })

    if( notification ) {
      await prisma.notification.delete({where: { id: notification.id }})
      return notification
    }
  }

  return null
}

export const getNotifications = async (req: Request, res: Response ) => {
  const userId = req.userId
  const user = await prisma.user.findUnique({
    where: { id: userId },
  })

  if( !user ) {
    return res.status(404).json({
      ok: false,
      msg: `No existe el usuario con el id ${userId}`
    })
  }

  try {
    const notifications = await prisma.notification.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return res.status(200).json({
      ok: true,
      msg: 'notificationes cargadas',
      notifications,
    })
  } catch (error) {
    console.error(error)
  }

  return res.status(200)
}

export const markAllNotificationsAsRead = async (req:Request, res: Response) => {
  const userId = req.userId 
  const user = await prisma.user.findUnique({ where: { id: userId }})

  if( !user ) {
    return res.status(200).json({
      ok: false,
      msg: `No existe el usuario con el id ${userId}`
    })
  }

  try {
    await prisma.notification.updateMany({
      where: {
        userId: user.id
      },
      data: {
        isRead: true
      }
    })
    return res.status(200).json({
      ok: true,
      msg: 'Todas las notificaciones leidas'
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Ocurrio un error al marcar las notificaciones como leídas'
    })
  }
}

export const deleteNotification = async (req: Request, res: Response) => {
  const userId = req.userId
  const notificationId = req.params.notificationId

  const user = await prisma.user.findUnique({where: { id: userId } })

  if( !user ) {
    return res.status(404).json({
      ok: false,
      msg: `no existe el usuario con el id ${userId}`
    })
  }

  try {
    await prisma.notification.delete({ where: { id: notificationId }})

    return res.status(200).json({
      ok: true,
      msg: 'Se ha eliminado la notificación'
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'No se pudo eliminar la notificación'
    })
  }
}
