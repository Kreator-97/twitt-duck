import { useEffect, useState } from 'react'
import { Post } from '@twitt-duck/state'
import useSWR from 'swr'

const BASE_URL = import.meta.env.VITE_BASE_URL || ''

export const useUserPosts = (username: string) => {
  const { data, error } = useSWR(`${BASE_URL}/api/post/user/${username}`)

  const [ posts, setPosts] = useState<Post[]>([])
  
  useEffect(() => {
    setPosts(data ? data.posts : [])
  }, [data])

  return {
    posts,
    error,
    isLoading: !error && !data,
  }
}
