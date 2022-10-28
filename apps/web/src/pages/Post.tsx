import { useRef } from 'react'
import { mutate } from 'swr'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Button, Flex, Grid, useToast } from '@chakra-ui/react'
import { CommentsList, Loader, Post, UserAvatar } from '@twitt-duck/ui'
import { createComment, toggleLikePost, createRepost } from '@twitt-duck/services'
import { useAppSelector } from '@twitt-duck/state'
import { usePost } from '@twitt-duck/hooks'

import { AppLayout } from '../layouts'

export const PostPage = () => {
  const { user } = useAppSelector( state => state.auth)
  const { pathname } = useLocation()
  const toast = useToast()
  const postId = pathname.split('/')[pathname.split('/').length-1] 
  const contentElementRef = useRef<HTMLDivElement>(null)
  const placeholder = 'Escribe un comentario'

  const navigate = useNavigate()

  if( !user ) {
    navigate('/auth/login')
    return <></> 
  }
  
  const { post, isLoading } = usePost(postId)
  if( isLoading ) return <Loader />

  const removePlaceholder = () => {
    const { current } = contentElementRef

    if( current ) {
      if( current.innerText === placeholder) {
        current.innerText = ''
      }
    } 
  }

  const setPlaceholder = () => {
    const { current } = contentElementRef

    if( current ) {
      if( current.innerText.replaceAll('\n', '') === '') {
        current.innerText = placeholder
      }
    }
  }

  if( !post ) {
    navigate('/')
    return <></>
  }

  const onCreateComment = async () => {
    const token = localStorage.getItem('token')
    const content = contentElementRef.current?.innerText

    if( !content || content?.trim() === '' ) return
    if( content === placeholder ) return
    if( !token ) return

    try {
      const { msg } = await createComment(post.id, content, token )
      
      toast({
        title: msg,
        position: 'top',
        status: 'success',
        duration: 3000,
        isClosable: true
      })

      mutate(`http://localhost:5000/api/post/${postId}`)

      contentElementRef.current.innerText = placeholder
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

  const onPostLiked = async (actionId: string) => {
    const token = localStorage.getItem('token')

    try {
      await toggleLikePost(actionId, token || '')
    } catch (error) {
      console.log(error)
    }
    
    mutate(`http://localhost:5000/api/post/${post.id}`)
  }
  
  const onCommentReposted = async (actionId: string, type: 'comment' | 'post') => {
    const token = localStorage.getItem('token')

    if( !token ) {
      console.error('token no existe')
      return
    }

    try {
      await createRepost(type, actionId, token)
      mutate(`http://localhost:5000/api/post/${post.id}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AppLayout>
      <Post
        post={post}
        onLikeEvent={ onPostLiked }
        onRepostEvent={ onCommentReposted }
      />

      <Grid
        gridTemplateColumns='48px 1fr'
        columnGap='.5rem'
        rowGap='1rem'
        p='1rem .5rem'
        bgColor='white'
        marginBottom='1rem'
        boxShadow={'md'}
      >
        <UserAvatar name={user.fullname} imgURL={ user.profilePic } />
        <Box
          contentEditable
          _focus={{ outline: 'none', borderBottom: '1px solid #CCC'}}
          ref={ contentElementRef }
          suppressContentEditableWarning
          onFocus={ () => removePlaceholder() }
          onBlur={ () => setPlaceholder() }
          minHeight='3rem'
          borderBottom='1px solid #CCC'
        >
          { placeholder }
        </Box>
        <Flex
          justify='end'
          gridColumnStart='span 2'
        >
          <Button
            size={'sm'}
            color='#fff'
            bgGradient='linear(to-b, cyan.400, teal.200)'
            _hover={{ bgGradient: 'linear(to-b, cyan.600, teal.300)'}}
            onClick={ () => onCreateComment() }
          >
            Agregar comentario
          </Button>
        </Flex>
      </Grid>

      <CommentsList
        comments={post.comments}
        post={post}
      />
    </AppLayout>
  )
}
