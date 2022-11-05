import { request } from '../utils/request'
import { Notification } from '@twitt-duck/state'

export const deleteNotificationRequest = async (notificationId: string, token: string) => {
  await request(`/api/notification/${notificationId}`, {
    method: 'DELETE',
    contentType: 'application/json',
    token,
  })
}

interface Response {
  msg: string;
  ok: boolean;
  notifications: Notification[];
}

export const getNotificationsRequest = async(token: string) => {
  const { notifications, ok } = await request<Response>('/api/notification', {
    token,
    contentType: 'application/json'
  })

  if( ok ) {
    return notifications
  }

  return Promise.reject('no se cargaron las notificaciones')
}
