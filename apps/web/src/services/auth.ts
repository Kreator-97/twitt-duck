import { User } from '@twitt-duck/state'
import { request } from '../utils/request'

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

type RegisterResponse = {
  ok: boolean;
  msg: string;
  errors? : any[]; // eslint-disable-line
}

export const registerRequest = async (fullname: string, email: string, password: string ) => {
  const data = await request<RegisterResponse>('/api/auth/register', {
    method: 'POST',
    body: { fullname, password, email }
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

export const saveProfile = async (username: string, description: string, profilePic: string, email: string) => {
  const data = await request<Response>('/api/auth/active-user', {
    method: 'POST',
    body: { username, description, profilePic, email }
  })

  if( !data.ok ) {
    if( data.errors ) console.error(data.errors)
    return Promise.reject(data.msg || 'Ocurrió un error')
  }
  
  return data
}
