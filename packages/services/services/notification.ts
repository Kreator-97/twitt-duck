import { request } from '../utils/request'

export const deleteNotificationRequest = async (notificationId: string, token: string) => {
  await request(`/api/notification/${notificationId}`, {
    method: 'DELETE',
    contentType: 'application/json',
    token,
  })
}
