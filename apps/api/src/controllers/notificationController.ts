import { Request, Response } from 'express'

import prisma from '../lib/prisma'

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

export const markNotificationASRead = async (req:Request, res: Response) => {
  const userId = req.userId 
  const user = await prisma.user.findUnique({ where: { id: userId }})

  const notificationId = req.params.notificationId.toString()
  
  if( !user ) {
    return res.status(404).json({
      ok: false,
      msg: `No existe el usuario con el id ${userId}`
    })
  }

  try {
    await prisma.notification.update({
      where: { id: notificationId },
      data: {
        isRead: true,
      }
    })

    return res.status(200).json({
      msg: 'Notificación leída',
      ok: true,
    })
  } catch(error) {
    console.error(error)
    return res.status(500).json({
      ok: false,
      msg: 'Ocurrió un error al intentar marcar la notificación como leída'
    })
  }

}

export const markAllNotificationsAsRead = async (req:Request, res: Response) => {
  const userId = req.userId 
  const user = await prisma.user.findUnique({ where: { id: userId }})
  
  if( !user ) {
    return res.status(404).json({
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
