import { Post } from '@twitt-duck/state'
import useSWR from 'swr'

interface Response {
  post: Post;
  ok: boolean;
  msg: string;
}

export const usePost = (postId: string) => {
  const { data, error } = useSWR<Response>(`http://localhost:5000/api/post/${postId}`)

  return {
    post: data ? data.post : null,
    isLoading: !data && !error,
  }
}
