import { request } from '../utils/request'

interface Response {
  msg: string,
  ok: boolean
  errors: string[]
}

export const createFollowRequest = async (username: string, token: string) => {
  const data = await request<Response>(`/api/follow/${username}`, {
    method: 'POST',
    contentType: 'application/json',
    token,
  })

  if( !data.ok ) {
    console.error(data.errors)
    return Promise.reject(data.msg)
  }

  return data
}

export const unfollowRequest = async( username: string, token: string ) => {
  const data = await request<Response>(`/api/follow/${username}`, {
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
