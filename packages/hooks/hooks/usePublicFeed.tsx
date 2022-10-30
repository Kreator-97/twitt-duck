import { Post } from '@twitt-duck/state'
import useSWR from 'swr'

const token = localStorage.getItem('token')
const headers = new Headers()
headers.append('Authorization', `Bearer ${token}`)

interface Response {
  ok: string;
  msg: string;
  publicPosts: Post[];
}

export const usePublicFeed = () => {
  const token = localStorage.getItem('token')
  const { data, error } = useSWR<Response>(['http://localhost:5000/api/feed/public-posts', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }])

  return {
    posts: data?.publicPosts || [],
    isLoading: !data && !error,
  }
}
