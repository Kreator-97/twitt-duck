import { request } from '../utils/request'
import { User } from '@twitt-duck/state'

type Response = {
  ok    : true;
  msg   : string;
  token : string;
  user  : User;
} | {
  ok      : false;
  errors? : any[]; // eslint-disable-line
  msg?    : string;
}

export const registerRequest = async (fullname: string, username: string, email: string, password: string ) => {
  const data = await request<Response>('/api/auth/register', { method: 'POST', body: { fullname, username, password, email }})

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
    body: { email, password }
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
    body: { id_token: token }
  })

  if( !data.ok ) {
    if( data.errors ) console.error(data.errors)
    return Promise.reject(data.msg || 'Ocurrió un error')
  }
  
  return data
}
