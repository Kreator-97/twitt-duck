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
