import { mutateUser, unfollowRequest } from '@twitt-duck/services'
import { NotificationPayload } from '@twitt-duck/state'
import { Socket } from 'socket.io-client'

export const unfollowUser = async (username: string, token: string, socket: Socket | null) => {
  await unfollowRequest(username, token)
  mutateUser(username)

  const notification: NotificationPayload = {
    username: username,
    type: 'user',
    isNew: false,
    msg: 'Hay que remover notificación'
  }

  socket?.emit('remove-notification', notification)
}
