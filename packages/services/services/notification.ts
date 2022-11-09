import { request } from '../utils/request'
import { Notification } from '@twitt-duck/state'

interface Response {
  msg: string;
  ok: boolean;
  notifications: Notification[];
}

export const deleteNotificationRequest = async (notificationId: string, token: string) => {
  await request(`/api/notification/${notificationId}`, {
    method: 'DELETE',
    contentType: 'application/json',
    token,
  })
}

export const markAllNotificationsAsReadRequest = async (token: string) => {
  await request('/api/notification/mark-all-as-read', {
    method: 'GET',
    token,
    contentType: 'application/json'
  })
}

export const markNotificationAsReadRequest = async (notificationId: string, token: string) => {
  await request(`/api/notification/${notificationId}`, {
    method: 'GET',
    token,
    contentType: 'application/json'
  })
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
