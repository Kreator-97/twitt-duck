import { Follow } from '@twitt-duck/state'
import useSWR from 'swr'

interface Response {
  followers: Follow[];
  following: Follow[];
}

const BASE_URL = import.meta.env.VITE_BASE_URL || ''

export const useFollow = (username: string) => {
  const { data, error } = useSWR<Response>(`${BASE_URL}/api/follow/${username}`)

  return {
    followers: data?.followers || [],
    following: data?.following || [],
    isLoading: !data && !error
  }
}
