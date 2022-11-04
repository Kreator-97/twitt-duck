import { useEffect } from 'react'
import { Feed } from '@twitt-duck/state'
import useSWR from 'swr'

interface Response {
  ok: boolean;
  msg: string;
  feed: Feed;
}

const BASE_URL = import.meta.env.VITE_BASE_URL || ''

export const useFeed = () => {
  const token = localStorage.getItem('token')
  const { data, error } = useSWR<Response>([`${BASE_URL}/api/feed/`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }])

  useEffect(() => {
    if( error ) {
      console.log(error)
    }
  }, [error])

  return {
    feed: data?.feed || {},
    isLoading: !data && !error,
  }
}
