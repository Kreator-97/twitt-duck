import useSWR from 'swr'
import { Post, Like, Images } from '@twitt-duck/state'

interface Response {
  ok    : string;
  msg   : string;
  posts : Post[];
  likes : Like[];
  images: Images[]
}

const BASE_URL = import.meta.env.VITE_BASE_URL || ''

export const useUserInfo = ( username: string ) => {
  const { data, error } = useSWR<Response>(`${BASE_URL}/api/user/info/${username}`)

  return {
    posts: data?.posts || [],
    likes: data?.likes || [],
    images: data?.images || [],
    isLoading: !data && !error,
  }
}

