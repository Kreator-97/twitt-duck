import useSWR from 'swr'
import { Comment } from '@twitt-duck/state'

interface Response {
  msg     : string;
  ok      : boolean;
  comment : Comment;
}

const BASE_URL = import.meta.env.VITE_BASE_URL || ''

export const useComment = (commentId: string) => {
  const { data, error } = useSWR<Response>(`${BASE_URL}/api/comment/${commentId}`)

  return {
    comment: data?.comment || null,
    isLoading: !data && !error,
  }
}
