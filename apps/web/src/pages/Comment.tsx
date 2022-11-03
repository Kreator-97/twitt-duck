import { useContext } from 'react'
import { mutate } from 'swr'
import { useLocation, useNavigate } from 'react-router-dom'
import { Grid, useToast } from '@chakra-ui/react'
import { Comment, CommentsList, InsertContent, Loader } from '@twitt-duck/ui'
import { createSubcomment } from '@twitt-duck/services'
import { NotificationPayload, SocketContext, useAppSelector } from '@twitt-duck/state'
import { useComment } from '@twitt-duck/hooks'

import { AppLayout } from '../layouts'

export const CommentPage = () => {
  const { socket } = useContext(SocketContext)
  const { user } = useAppSelector( state => state.auth)
  const { pathname } = useLocation()
  const toast = useToast()
  const commentId = pathname.split('/')[pathname.split('/').length-1] 

  const navigate = useNavigate()

  if( !user ) {
    navigate('/auth/login')
    return <></> 
  }
  
  const { comment, isLoading } = useComment(commentId)
  if( isLoading ) return <Loader />

  if( !comment ) {
    navigate('/')
    return <></>
  }

  const onCreateSubcomment = async (content: string) => {
    const token = localStorage.getItem('token')
    
    if( !token ) return

    try {
      const { msg } = await createSubcomment(comment.id, content, token )
      
      toast({
        title: msg,
        position: 'top',
        status: 'success',
        duration: 3000,
        isClosable: true
      })

      mutate(`http://localhost:5000/api/comment/${comment.id}`)

      const notification: NotificationPayload = {
        msg: 'nueva notificación',
        id: comment.id,
        type: 'comment',
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
        <Comment comment={comment} />
        <InsertContent user={user} onSubmit={ onCreateSubcomment } />

        <CommentsList
          comments={comment.comments}
        />
      </Grid>

    </AppLayout>
  )
}
