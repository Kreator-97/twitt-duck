import { request } from '../utils/request'

type Props = {
  ok: false,
  msg: string,
  error: string,
  errors: string[]
} | {
  ok: true,
  msg: string,
  comment: Comment,
}

export const createComment = async (postId: string, content: string, token: string) => {
  const data = await request<Props>(`/api/comment/${postId}`, {
    method: 'POST',
    body: JSON.stringify({content}),
    contentType: 'application/json',
    token
  })

  if( !data.ok ) {
    console.log(data.errors)
    return Promise.reject(data.msg)
  }

  return data
}

export const toggleLikeComment = async (commentId: string, token: string) => {
  await request(`/api/comment/${commentId}/toggle-like`, {
    method: 'PUT',
    token,
    contentType: 'application/json'
  })
}

