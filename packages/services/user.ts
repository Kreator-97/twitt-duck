import { User } from '@twitt-duck/state'
import { request } from './utils/request'

type Response = {
  ok: false;
  msg: string;
  errors: string[];
} | {
  ok: true;
  msg: string;
  user?: User;
  imgURL?: string
}

export const changePasswordRequest = async (currentPassword: string, newPassword: string, token: string) => {
  const data = await request<Response>('/api/user/change-password', {
    method: 'PUT',
    body: JSON.stringify({currentPassword, newPassword}),
    contentType: 'application/json',
    token,
  })

  if( !data.ok ) {
    console.error(data.errors)
    return Promise.reject(data.msg)
  }

  return data
}

interface Update {
  fullname: string, username: string, description: string
}

export const updateUserRequest = async ( update: Update, token: string ) => {
  const data = await request<Response>('/api/user', {
    method: 'PUT',
    body: JSON.stringify(update),
    contentType: 'application/json',
    token,
  })

  if( !data.ok ) {
    console.log(data.errors)
    return Promise.reject(data.msg)
  }

  return data
}

export const updateUserBackgroundRequest = async (backgroundPic: string, token: string) => {
  const data = await request<Response>('/api/user/change-background-picture', {
    method: 'PUT',
    body: JSON.stringify({backgroundPic}),
    contentType: 'application/json',
    token,
  })
  if( !data.ok ) {
    console.log(data.errors)
    return Promise.reject(data.msg)
  }

  return data.imgURL
}
