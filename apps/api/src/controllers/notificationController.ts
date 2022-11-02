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

export const removeNotification =  async (notification: NotificationInfo, userId: string) => {
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
    }
  }
}

export const getNotifications = async (req: Request, res: Response ) => {
  const userId = req.userId
  const user = await prisma.user.findUnique({ where: { id: userId } })

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
        isRead: false
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
