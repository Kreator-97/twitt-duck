import { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Grid, useToast } from '@chakra-ui/react'
import { usePost } from '@twitt-duck/hooks'
import { createComment, mutatePostPage } from '@twitt-duck/services'
import { CommentsList, InsertContent, Loader, Post } from '@twitt-duck/ui'
import { NotificationPayload, SocketContext, useAppSelector } from '@twitt-duck/state'

import { AppLayout } from '../layouts'

export const PostPage = () => {
  const { socket } = useContext(SocketContext)
  const { user } = useAppSelector( state => state.auth)
  const { pathname } = useLocation()
  const toast = useToast()
  const postId = pathname.split('/')[pathname.split('/').length-1] 

  const navigate = useNavigate()

  if( !user ) {
    navigate('/auth/login')
    return <></> 
  }
  
  const { post, isLoading } = usePost(postId)
  if( isLoading ) return <Loader />

  if( !post ) {
    navigate('/')
    return <></>
  }

  const onCreateComment = async (content: string) => {
    const token = localStorage.getItem('token')
    if( !token ) return

    try {
      await createComment(post.id, content, token )
      
      toast({
        title: 'Comentario agregado',
        position: 'top',
        status: 'success',
        duration: 3000,
        isClosable: true
      })

      mutatePostPage(postId)

      const notification: NotificationPayload = {
        msg: 'nueva notificación',
        id: post.id,
        type: 'post',
        isNew: false,
      }

      socket?.emit('user-notification-comment', notification)

    } catch (error) {
      console.error(error)
      if( typeof error === 'string' ) {
        toast({
          title: error,
          position: 'top',
          status: 'error',
          duration: 3000,
          isClosable: true
        })
      }
    }
  }

  return (
    <AppLayout>
      <Grid
        gap={{ base: '.5rem', lg: '1rem' }}
        gridTemplateColumns='1fr'
      >
        <Post
          post={post}
        />
        <InsertContent user={user} onSubmit={onCreateComment}/>

        <CommentsList
          comments={post.comments}
        />
      </Grid>

    </AppLayout>
  )
}
