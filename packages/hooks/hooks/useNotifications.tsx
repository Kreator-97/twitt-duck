import useSWR from 'swr'
import { Notification } from '@twitt-duck/state'

interface Response {
  msg: string;
  ok: boolean;
  notifications: Notification[];
}

export const useNotifications = () => {
  const token = localStorage.getItem('token')
  const { data, error } = useSWR<Response>(['http://localhost:5000/api/notification', {
    headers: {
      authorization: `Bearer ${token}`
    }
  }])

  return {
    notifications: data?.notifications,
    isLoading: !data && !error,
  }
}
