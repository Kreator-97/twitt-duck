import useSWR from 'swr'
import { Post, User } from '@twitt-duck/state'

interface Response {
  msg   : string;
  ok    : boolean;
  posts : Post[];
  users : User[];
}

const BASE_URL = import.meta.env.VITE_BASE_URL || ''

export const useSearch = (query: string) => {

  const { data, error } = useSWR<Response>(`${BASE_URL}/api/search/${query}`)

  return {
    posts: data?.posts || [],
    users: data?.users || [],
    isLoading: !data && !error
  }
}
