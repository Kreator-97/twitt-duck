import { Repost } from '@twitt-duck/state'
import { request } from '../utils/request'

type Response = {
  ok: false;
  msg: string;
  errors: string[];
} | {
  ok: true;
  msg: string;
  repost?: Repost;
}

export const createRepost = async (type: string, postId: string, token: string,) => {
  const data = await request<Response>('/api/repost', {
    method: 'POST',
    body: JSON.stringify({ type, postId }),
    contentType: 'application/json',
    token,
  })

  if( !data.ok ) {
    console.error(data.errors)
    return Promise.reject(data.msg)
  }

  return data
}

export const deleteRepostRequest = async (repostId: string, token: string) => {
  const data = await request<Response>(`/api/repost/${repostId}`, {
    method: 'DELETE',
    contentType: 'application/json',
    token,
  })

  if( !data.ok ) {
    console.error(data.errors)
    return Promise.reject(data.msg)
  }

  return data
}
