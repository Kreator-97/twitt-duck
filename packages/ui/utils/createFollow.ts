import { createFollowRequest, mutateUser } from '@twitt-duck/services'
import { NotificationPayload } from '@twitt-duck/state'
import { Socket } from 'socket.io-client'

export const createFollow = async (username: string, token: string, socket: Socket | null) => {
  await createFollowRequest(username, token)
  mutateUser(username)

  const notification: NotificationPayload = {
    username: username,
    type    : 'user',
    isNew   : false,
    msg     : 'nuevo seguidor',
  }

  socket?.emit('user-notification-follower', notification)
}
