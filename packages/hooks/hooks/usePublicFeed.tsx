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

const BASE_URL = import.meta.env.VITE_BASE_URL || ''

export const usePublicFeed = () => {
  const token = localStorage.getItem('token')
  const { data, error } = useSWR<Response>([`${BASE_URL}/api/feed/public-posts`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }])

  return {
    posts: data?.publicPosts || [],
    isLoading: !data && !error,
  }
}
