import { User } from '@twitt-duck/state'
import useSWR from 'swr'

interface Response {
  user: User;
  msg: string;
  ok: boolean;
}

export const userUser = (username: string) => {
  const { data, error } = useSWR<Response>(`http://localhost:5000/api/user/${username}`)

  return {
    user: data?.user,
    isLoading: !data && !error,
  }
}
