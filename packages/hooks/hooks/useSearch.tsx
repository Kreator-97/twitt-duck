import useSWR from 'swr'
import { Post, User } from '@twitt-duck/state'

interface Response {
  msg   : string;
  ok    : boolean;
  posts : Post[];
  users : User[];
}

export const useSearch = (query: string) => {

  const { data, error } = useSWR<Response>(`http://localhost:5000/api/search/${query}`)

  return {
    posts: data?.posts || [],
    users: data?.users || [],
    isLoading: !data && !error
  }
}
