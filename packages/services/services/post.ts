import { Post } from '@twitt-duck/state'
import { request } from '../utils/request'

type Response = {
  ok: false;
  msg: string;
  errors: string[];
} | {
  ok: true;
  msg: string;
  post: Post;
}

export const createPost = async (content: string, images: string[], token: string, privacy: string) => {
  const data = await request<Response>('/api/post', {
    method: 'POST',
    body: JSON.stringify({ content, privacy, images }),
    contentType: 'application/json',
    token,
  })

  if( !data.ok ) {
    console.error(data.errors)
    return Promise.reject(data.msg)
  }

  return data
}

export const toogleLikePost = async (postId: string, token: string) => {
  const data = await request<Response>(`/api/post/${postId}/toggle-like`, {
    method: 'PUT',
    contentType: 'application/json',
    token
  })

  if( !data.ok ) {
    console.log(data.errors)
    return Promise.reject(data.msg)
  }

  return data
}

