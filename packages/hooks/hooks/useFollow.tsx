import { Follow } from '@twitt-duck/state'
import useSWR from 'swr'

interface Response {
  followers: Follow[];
  following: Follow[];
}

export const useFollow = (username: string) => {
  const { data, error } = useSWR<Response>(`http://localhost:5000/api/follow/${username}`)

  return {
    followers: data?.followers || [],
    following: data?.following || [],
    isLoading: !data && !error
  }
}
