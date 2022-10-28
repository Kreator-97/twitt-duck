import { useToast } from '@chakra-ui/react'
import { usePosts } from '@twitt-duck/hooks'
import { createRepost, toggleLikePost } from '@twitt-duck/services'
import { mutate } from 'swr'

import { Post } from '.'
import { Loader } from './Loader'

export const PostsList = () => {
  const toast = useToast()
  const { posts, isLoading } = usePosts()

  if ( isLoading ) {
    return <Loader />
  }

  const onLikeEvent = async (actionId: string) => {
    const token = localStorage.getItem('token')

    try {
      await toggleLikePost(actionId, token || '')
      mutate('http://localhost:5000/api/post/')

    } catch (error) {
      console.log(error)
    }
  }

  const onRepostEvent = async (actionId: string, type: string) => {
    const token = localStorage.getItem('token')

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

  return (
    <div>
      {
        (posts.length === 0)
          ? 'Personaliza tu feed siguiendo a personas'
          : (
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
          )
      }
    </div>
  )
}
