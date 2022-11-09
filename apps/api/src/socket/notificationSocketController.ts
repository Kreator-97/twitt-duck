import { Notification } from '@prisma/client'
import { NotificationInfo } from '../interfaces'
import prisma from '../lib/prisma'

export const createLikeNotification = async (notificationInfo: NotificationInfo, userId: string): Promise< Notification| null> => {
  const { type, id } = notificationInfo
  const user = await prisma.user.findUnique({ where: { id: userId }})

  if( !user ) return null

  if( type === 'post' ) {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: true,
      }
    })

    if( !post ) {
      return Promise.reject('No se pudo crear la notificación. Post no existe')
    }
    if( !post.author ) {
      return Promise.reject('No se pudo crear la notificación. Author no encontrado no existe')
    }

    try {
      if( userId === post.author.id ) return null
      const notification = await prisma.notification.create({
        data: {
          title: `Al usuario @${user.username} le ha gustado tu publicación`,
          userId: post.author.id,
          fromUserId: userId,
          type: 'POST',
          actionId: id
        }
      })
      return notification
    } catch (error) {
      console.error(error)
    }
  }

  if( type === 'comment' ) {
    console.log('creando notificacion de like comment')
    const comment = await prisma.comment.findUnique({
      where: { id },
      include: {
        author: true,
      }
    })

    if( !comment ) {
      return Promise.reject('No se pudo crear la notificación. Post no existe')
    }
    if( !comment.author ) {
      return Promise.reject('No se pudo crear la notificación. Author no encontrado no existe')
    }

    try {
      if( userId === comment.author.id ) return null
      const notification = await prisma.notification.create({
        data: {
          title: `Al usuario @${user.username} le ha gustado tu comentario`,
          userId: comment.author.id,
          fromUserId: userId,
          type: 'COMMENT',
          actionId: id
        }
      })
      return notification
    } catch (error) {
      console.error(error)
    }
  }

  return Promise.reject('No se pudo crear la notificación. Type no permitido')
}

export const createCommentNotification = async( notificationInfo: NotificationInfo, userId: string ): Promise<Notification | null> => {

  const user = await prisma.user.findUnique({where: { id: userId }})

  if( !user ) {
    console.log('usuario no encontrado')
    return null
  }

  if( notificationInfo.type === 'post' ) {
    try {
      const post = await prisma.post.findUnique({
        where: { id: notificationInfo.id },
        include: {
          author: true
        }
      })

      if( post?.author?.id === user.id ) return null

      if( !post ) {
        console.log('post no encontrado')
        return null
      }
      
      if( !post.author ) {
        console.log('author no encontrado')
        return null
      }

      const notification = await prisma.notification.create({
        data: {
          fromUserId: user.id,
          title: `El usuario @${user.username} comentó tu publicación`,
          type: 'POST',
          userId: post.author.id,
          actionId: post.id,
        }
      })
      
      return notification
    } catch (error) {
      console.log(error)
      return null 
    }
  }

  if( notificationInfo.type === 'comment' ) {
    try {
      const comment = await prisma.comment.findUnique({
        where: { id: notificationInfo.id },
        include: {
          author: true
        }
      })

      if( !comment ) {
        console.log('post no encontrado')
        return null
      }
      
      if( !comment.author ) {
        console.log('author no encontrado')
        return null
      }

      if( comment?.author?.id === user.id ) return null

      const notification = await prisma.notification.create({
        data: {
          fromUserId: user.id,
          title: `El usuario @${user.username} respondió tu comentario`,
          type: 'COMMENT',
          userId: comment.author.id,
          actionId: comment.id,
        }
      })
      
      return notification
    } catch (error) {
      console.log(error)
      return null 
    }
  }

  return null
}

export const createRepostNotification = async(notificationInfo: NotificationInfo, userId: string): Promise<null | Notification> => {
  const user = await prisma.user.findUnique({where: { id: userId }})

  if( !user ) {
    console.log('usuario no encontrado')
    return null
  }

  if( notificationInfo.type === 'post' ) {
    try {
      const post = await prisma.post.findUnique({
        where: { id: notificationInfo.id },
        include: {
          author: true,

        }
      })

      if( !post ) {
        console.log('post no encontrado')
        return null
      }
      
      if( !post.author ) {
        console.log('author no encontrado')
        return null
      }

      if( post?.author?.id === user.id ) return null

      const notification = await prisma.notification.create({
        data: {
          fromUserId: user.id,
          title: `El usuario @${user.username} difundió tu publicación`,
          type: 'POST',
          userId: post.author.id,
          actionId: post.id,
        }
      })
      
      return notification
    } catch (error) {
      console.log(error)
      return null 
    }
  }

  if( notificationInfo.type === 'comment' ) {
    const comment = await prisma.comment.findUnique({
      where: { id: notificationInfo.id },
      include: {
        author: true,
      }
    })

    if( !comment ) {
      return Promise.reject('No se pudo crear la notificación. Post no existe')
    }
    if( !comment.author ) {
      return Promise.reject('No se pudo crear la notificación. Author no encontrado no existe')
    }

    if( comment?.author?.id === user.id ) return null

    try {
      if( userId === comment.author.id ) return null
      const notification = await prisma.notification.create({
        data: {
          title: `El usuario @${user.username} difundió tu comentario`,
          userId: comment.author.id,
          fromUserId: userId,
          type: 'COMMENT',
          actionId: notificationInfo.id
        }
      })
      return notification
    } catch (error) {
      console.error(error)
    }
  }

  return null
}

export const createFollowerNotification = async (notificationInfo: NotificationInfo, userId: string):Promise<Notification> => {

  const user = await prisma.user.findUnique({ where: { id: userId }})
  const username = notificationInfo.username

  if( !username ) {
    return Promise.reject('Username debe de ser válido')
  }

  if( !user ) {
    return Promise.reject('No existe el usuario con el id proporcionado')
  }

  const userToNotificate = await prisma.user.findUnique({
    where: { username }
  })

  if( !userToNotificate ) {
    return Promise.reject(`No se ha encontrado al usuario con username ${username}`)
  }

  try {
    const notification = await prisma.notification.create({
      data: {
        fromUserId: user.id,
        title: `El usuario @${user.username} ha comenzado a seguirte`,
        type: 'USER',
        userId: userToNotificate.id,
      }
    })

    return notification

  } catch (error) {
    return Promise.reject('Ocurrió un error al intentar crear la notificación de nuevo seguidor')
  }
}

export const removeNotification = async (notificationInfo: NotificationInfo, userId: string):Promise<Notification | null> => {
  const { type, id, username } = notificationInfo

  const user = await prisma.user.findUnique({
    where: { id: userId }
  })

  if( !user ) {
    return Promise.reject(`No existe el usuario con el id ${userId}`)
  }

  if( type === 'post') {
    const notification = await prisma.notification.findFirst({
      where: {
        type: 'POST',
        actionId: id,
        fromUserId: userId
      }
    })

    if( notification ) {
      await prisma.notification.delete({where: { id: notification.id }})
      return notification
    }
  }

  if( type === 'comment') {
    const notification = await prisma.notification.findFirst({
      where: {
        type: 'COMMENT',
        actionId: id,
        fromUserId: userId
      }
    })

    if( notification ) {
      await prisma.notification.delete({where: { id: notification.id }})
      return notification
    }
  }

  if( type === 'user' ) {
    const notificationUser = await prisma.user.findUnique({ where: { username } })

    const notification = await prisma.notification.findFirst({
      where: {
        userId: notificationUser.id,
        fromUserId: user.id,
        type: 'USER',
      }
    })

    if( !notification ) return null

    try {
      await prisma.notification.delete({ where: { id: notification.id }})
      return notification
    } catch(error) {
      console.log(error)
      return null
    }
  }

  return null
}


