import useSWR from 'swr'
import { Comment } from '@twitt-duck/state'

interface Response {
  msg     : string;
  ok      : boolean;
  comment : Comment;
}

export const useComment = (commentId: string) => {
  const { data, error } = useSWR<Response>(`http://localhost:5000/api/comment/${commentId}`)

  console.log(data)

  return {
    comment: data?.comment || null,
    isLoading: !data && !error,
  }
}
