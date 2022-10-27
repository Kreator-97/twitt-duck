import { useEffect, useState } from 'react'
import { Post } from '@twitt-duck/state'
import useSWR from 'swr'

export const useUserPosts = (username: string) => {
  const { data, error } = useSWR(`http://localhost:5000/api/post/user/${username}`)

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
