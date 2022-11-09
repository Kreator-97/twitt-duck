import { User } from '@twitt-duck/state'
import { mutate as mutateSWR } from 'swr'

const BASE_URL = import.meta.env.VITE_BASE_URL || ''

export const mutateAllPages = (pathname: string) => {
  // this custom mutate works to re-fetch all the pages depending on current pathname page
  const token = localStorage.getItem('token')
  mutateSWR([`${BASE_URL}/api/feed/`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }])
  mutateSWR([`${BASE_URL}/api/feed/public-posts`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }])
  
  if( pathname.startsWith('/post/') ) {
    const URLToReload = `${BASE_URL}/api${pathname}`
    mutateSWR(URLToReload)
  }
  if( pathname.startsWith('/comment/') ) {
    const URLToReload = `${BASE_URL}/api${pathname}`
    mutateSWR(URLToReload)
  }
  if( pathname.startsWith('/user/') ) {
    const username = pathname.split('/')[pathname.split('/').length-1]
    const URLToReload = `${BASE_URL}/api/user/info/${username}`
    mutateSWR(URLToReload)
  }
  if( pathname.startsWith('/profile') ) {
    const user = JSON.parse(localStorage.getItem('user') || '{}') as User
    const URLToReload = `${BASE_URL}/api/user/info/${user.username}`
    mutateSWR(URLToReload)
  }
}

export const mutateCommentPage = (commentId: string) => mutateSWR(`${BASE_URL}/api/comment/${commentId}`)

export const mutatePostPage = (postId: string) => mutateSWR(`${BASE_URL}/api/post/${postId}`)

export const mutateUser = (username: string) => mutateSWR(`${BASE_URL}/api/user/${username}`)

export const mutateFollows = (username: string) => {
  const url = `${BASE_URL}/api/follow/${username}`
  mutateSWR(url)
}
