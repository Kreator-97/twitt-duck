import { Socket } from 'socket.io'
import { NotificationInfo } from '../interfaces'
import prisma from '../lib/prisma'
import { validateToken } from '../util/jwt'

import {
  createCommentNotification,
  createFollowerNotification,
  createLikeNotification,
  createRepostNotification,
  removeNotification
} from '../socket/notificationSocketController'

export const socketController = async (socket:Socket) => {
  console.log('Cliente conectado', socket.id)
  const token = socket.handshake.headers.token?.toString()

  if( !token ) {
    socket.disconnect()
    return
  }

  const payload = await validateToken(token)
  const user = await prisma.user.findUnique({ where: { id: payload.id} })

  if( !user ) {
    console.log('Socket no autorizado')
    socket.disconnect()
    return
  }

  socket.join(user.id)

  socket.emit('welcome', 'Bienvenido al server')

  socket.on('disconnect', () => {
    console.log('cliente desconectado')
  })

  socket.on('user-notification-like', async (payload: NotificationInfo) => {
    if( payload.isNew ) {
      try {
        const notification = await createLikeNotification(payload, user.id)
        if( notification ) {
          socket.to(notification.userId).emit('notification', notification)
        }
      } catch (error) {
        console.error(error)
      }
    }

    if( !payload.isNew ) {
      try {
        const notification = await removeNotification(payload, user.id)

        if( notification ) {
          socket.to(notification.userId).emit('remove-notification', notification)
        }
      } catch(error) {
        console.log(error)
      }
    }
  })

  socket.on('user-notification-comment', async (payload: NotificationInfo) => {
    try {
      const notification = await createCommentNotification(payload, user.id)

      if( notification ) {
        socket.to(notification.userId).emit('notification', notification)
      }
    } catch (error) {
      console.log(error)
    }
  })

  socket.on('user-notification-repost', async(payload: NotificationInfo) => {
    try {
      const notification = await createRepostNotification(payload, user.id)

      if( notification ) {
        socket.to(notification.userId).emit('notification', notification)
      }
    } catch (error) {
      console.log(error)
    }
  })

  socket.on('user-notification-follower', async (payload) => {
    console.log(payload)
    try {
      const notification = await createFollowerNotification(payload, user.id)
      socket.to(notification.userId).emit('notification', notification)
    } catch (error) {
      console.log(error)
    }
  })
}
