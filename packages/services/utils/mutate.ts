import { User } from '@twitt-duck/state'
import { mutate as mutateSWR } from 'swr'

// this custom mutate works to re-fetch all the pages depending on current pathname page

export const mutate = (pathname: string) => {
  const token = localStorage.getItem('token')
  mutateSWR(['http://localhost:5000/api/feed/', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }])
  mutateSWR(['http://localhost:5000/api/feed/public-posts', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }])
  
  if( pathname.startsWith('/post/') ) {
    const URLToReload = `http://localhost:5000/api${pathname}`
    mutateSWR(URLToReload)
  }
  if( pathname.startsWith('/comment/') ) {
    const URLToReload = `http://localhost:5000/api${pathname}`
    mutateSWR(URLToReload)
  }
  if( pathname.startsWith('/user/') ) {
    const username = pathname.split('/')[pathname.split('/').length-1]
    const URLToReload = `http://localhost:5000/api/user/info/${username}`
    mutateSWR(URLToReload)
  }
  if( pathname.startsWith('/profile') ) {
    const user = JSON.parse(localStorage.getItem('user') || '{}') as User
    const URLToReload = `http://localhost:5000/api/user/info/${user.username}`
    mutateSWR(URLToReload)
  }
}
