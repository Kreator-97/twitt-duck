import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader, NewPost, Post } from '@twitt-duck/ui'
import { useToast } from '@chakra-ui/react'
import { useSWRConfig } from 'swr'

import { AppLayout } from '../layouts/AppLayout'
import { createPost } from '../services/post'
import { DBLocal } from '../utils'
import { uploadMultipleImagesRequest } from '../services/upload'
import { usePosts } from '../hooks'

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
              <Post key={post.id} post={post}/>
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
