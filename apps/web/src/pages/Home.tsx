import { Loader, NewPost, Post } from '@twitt-duck/ui'
import { useToast } from '@chakra-ui/react'
import { useSWRConfig } from 'swr'

import { AppLayout } from '../layouts/AppLayout'
import { createPost } from '../services/post'
import { usePosts } from '../hooks/usePosts'
import { DBLocal } from '../utils'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const HomePage = () => {
  const toast = useToast()
  const { mutate } = useSWRConfig()
  const navigate = useNavigate()
  const { posts, isLoading } = usePosts()

  useEffect(() => {
    const user = DBLocal.loadUserFromLocal()
    if( !user ) {
      navigate('/auth/login')
    }
  }, [])

  if ( isLoading ) {
    return <Loader />
  }

  const onCreatePost = async (content: string) => {
    const token = DBLocal.getTokenFromLocal()

    try {
      await createPost(content, token || '')
      toast({
        title: 'Publicación creada',
        status: 'success',
        duration: 3000,
        position: 'top',
        isClosable: true,
      })
      mutate('http://localhost:5000/api/post/')
    } catch (error) {
      if( typeof error === 'string' ) {
        toast({
          title: 'No se pudo crear el post',
          description: error,
          status: 'error',
          duration: 3000,
          position: 'top',
          isClosable: true,
        })
      }
      console.log(error)
    }
  }

  return (
    <AppLayout>
      <div>
        <NewPost onCreatePost={ onCreatePost } />
        {
          posts.map((post) => {
            return (
              <Post key={post.id} post={post}/>
            )
          })
        }
      </div>
    </AppLayout>
  )
}
