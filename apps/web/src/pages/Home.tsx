import { useEffect, useState } from 'react'
import { useSWRConfig } from 'swr'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
import { Loader, NewPost, Post } from '@twitt-duck/ui'
import { createPost, createRepost, toggleLikePost, uploadMultipleImagesRequest } from '@twitt-duck/services'
import { usePosts } from '@twitt-duck/hooks'

import { AppLayout } from '../layouts/AppLayout'
import { DBLocal } from '../utils'

export const HomePage = () => {
  const toast = useToast()
  const { mutate } = useSWRConfig()
  const navigate = useNavigate()
  const { posts, isLoading } = usePosts()
  const [ createPostLoading, setCreatePostLoading] = useState(false)

  useEffect(() => {
    const user = DBLocal.loadUserFromLocal()
    if( !user ) {
      navigate('/auth/login')
    }
  }, [])

  if ( isLoading ) {
    return <Loader />
  }

  const onLikeEvent = async (actionId: string) => {
    const token = DBLocal.getTokenFromLocal()

    try {
      await toggleLikePost(actionId, token || '')
      mutate('http://localhost:5000/api/post/')

    } catch (error) {
      console.log(error)
    }
  }

  const onRepostEvent = async (actionId: string, type: string) => {
    const token = DBLocal.getTokenFromLocal()

    try {
      await createRepost(type, actionId, token || '')
      mutate('http://localhost:5000/api/post/')
      toast({
        title: 'Has difundido esta publicación',
        position: 'top',
        isClosable: true,
        status: 'success',
        duration: 3000,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const onCreatePost = async (content: string, privacy: string, fileList: FileList) => {
    setCreatePostLoading(true)
    const token = DBLocal.getTokenFromLocal()

    let images: string[] = []

    if( fileList ) {
      images = await uploadMultipleImagesRequest( fileList, token || '' )
    }

    try {
      await createPost(content, images, token || '', privacy)
      toast({
        title: 'Publicación creada',
        status: 'success',
        duration: 3000,
        position: 'top',
        isClosable: true,
      })
      mutate('http://localhost:5000/api/post/')
      setCreatePostLoading(false)
    } catch (error) {
      setCreatePostLoading(false)
      console.log(error)
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
    }
  }

  return (
    <AppLayout>
      <div>
        <NewPost onCreatePost={ onCreatePost } />
        {
          posts.map((post) => {
            return (
              <Post
                key={post.id}
                post={post}
                onLikeEvent={ onLikeEvent }
                onRepostEvent={onRepostEvent}
              />
            )
          })
        }
      </div>
      {
        createPostLoading && <Loader />
      }
    </AppLayout>
  )
}
