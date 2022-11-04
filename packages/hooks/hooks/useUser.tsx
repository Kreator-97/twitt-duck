import { User } from '@twitt-duck/state'
import useSWR from 'swr'

interface Response {
  user: User;
  msg: string;
  ok: boolean;
}

const BASE_URL = import.meta.env.VITE_BASE_URL || ''

export const useUser = (username: string) => {
  const { data, error } = useSWR<Response>(`${BASE_URL}/api/user/${username}`)

  return {
    user: data?.user,
    isLoading: !data && !error,
  }
}
