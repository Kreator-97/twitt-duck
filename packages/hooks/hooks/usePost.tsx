import { Post } from '@twitt-duck/state'
import useSWR from 'swr'

interface Response {
  post: Post;
  ok: boolean;
  msg: string;
}

const BASE_URL = import.meta.env.VITE_BASE_URL || ''

export const usePost = (postId: string) => {
  const { data, error } = useSWR<Response>(`${BASE_URL}/api/post/${postId}`)

  return {
    post: data ? data.post : null,
    isLoading: !data && !error,
  }
}
