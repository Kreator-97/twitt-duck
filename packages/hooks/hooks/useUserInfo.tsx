import useSWR from 'swr'
import { Post, Like, Images } from '@twitt-duck/state'

interface Response {
  ok    : string;
  msg   : string;
  posts : Post[];
  likes : Like[];
  images: Images[]
}

export const useUserInfo = ( username: string ) => {
  const { data, error } = useSWR<Response>(`http://localhost:5000/api/user/info/${username}`)

  return {
    posts: data?.posts || [],
    likes: data?.likes || [],
    images: data?.images || [],
    isLoading: !data && !error,
  }
}

