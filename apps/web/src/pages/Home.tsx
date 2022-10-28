import { useEffect, useMemo, useState } from 'react'
import { useSWRConfig } from 'swr'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
import { Loader, NewPost, PostsList, UserFeed } from '@twitt-duck/ui'
import { useFeed } from '@twitt-duck/hooks'

import {
  createPost,
  uploadMultipleImagesRequest
} from '@twitt-duck/services'

import { AppLayout } from '../layouts'
import { DBLocal } from '../utils'

export const HomePage = () => {
  const toast = useToast()
  const { mutate } = useSWRConfig()
  const navigate = useNavigate()
  const [ createPostLoading, setCreatePostLoading] = useState(false)

  useEffect(() => {
    const user = DBLocal.loadUserFromLocal()
    if( !user ) {
      navigate('/auth/login')
    }
  }, [])

  const { feed, isLoading }= useFeed()
  
  const feedLength = useMemo(() => {
    return Object.keys(feed).length
  }, [feed])

  if( isLoading ) {
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

          ( feedLength !== 0 )
            ? <UserFeed feed={feed} />
            : (<PostsList />)
        }
      </div>
      {
        createPostLoading && <Loader />
      }
    </AppLayout>
  )
}
