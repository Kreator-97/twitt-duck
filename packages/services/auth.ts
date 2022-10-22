import { User } from '@twitt-duck/state'
import { request } from './utils/request'

type Response = {
  ok    : true;
  msg   : string;
  token : string;
  user  : User;
} | {
  ok      : false;
  errors? : string[];
  msg?    : string;
}

export const registerRequest = async (fullname: string, email: string, password: string ) => {

  const data = await request<Response>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ fullname, password, email }),
    contentType: 'application/json'
  })

  if( !data.ok ) {
    console.log(data)
    if( data.errors ) console.error(data.errors)
    return Promise.reject(data.msg || 'Ocurrió un error')
  }

  return data
}

export const loginRequest = async(email: string, password: string) => {

  const data = await request<Response>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    contentType: 'application/json'
  })

  if( !data.ok ) {
    console.log(data)
    if( data.errors ) console.error(data.errors)
    return Promise.reject(data.msg || 'Ocurrió un error')
  }

  return data
}

export const googleRequest = async (token: string) => {

  const data = await request<Response>('/api/auth/google', {
    method: 'POST',
    body: JSON.stringify({ id_token: token }),
    contentType: 'application/json',
  })

  if( !data.ok ) {
    if( data.errors ) console.error(data.errors)
    return Promise.reject(data.msg || 'Ocurrió un error')
  }
  
  return data

}

interface ProfileUpdate {
  username: string;
  description: string;
}

export const saveProfile = async ({ description, username }: ProfileUpdate, token: string) => {

  const data = await request<Response>('/api/auth/active-user', {
    method: 'POST',
    body: JSON.stringify({ username, description }),
    contentType: 'application/json',
    token
  })

  if( !data.ok ) {
    if( data.errors ) console.error(data.errors)
    return Promise.reject(data.msg || 'Ocurrió un error')
  }
  
  return data
}
