import useSWR from 'swr'
import { Notification } from '@twitt-duck/state'

interface Response {
  msg: string;
  ok: boolean;
  notifications: Notification[];
}

const BASE_URL = import.meta.env.VITE_BASE_URL || ''

export const useNotifications = () => {
  const token = localStorage.getItem('token')
  const url = `${BASE_URL}/api/notification`
  const { data, error } = useSWR<Response>([url, {
    headers: {
      authorization: `Bearer ${token}`
    }
  }])

  return {
    notifications: data?.notifications,
    isLoading: !data && !error,
  }
}
