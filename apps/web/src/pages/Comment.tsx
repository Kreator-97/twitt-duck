import { useRef } from 'react'
import { mutate } from 'swr'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Button, Flex, Grid, useToast } from '@chakra-ui/react'
import { Comment, CommentsList, Loader, UserAvatar } from '@twitt-duck/ui'
import { createSubcomment } from '@twitt-duck/services'
import { useAppSelector } from '@twitt-duck/state'
import { useComment } from '@twitt-duck/hooks'

import { AppLayout } from '../layouts'

export const CommentPage = () => {
  const { user } = useAppSelector( state => state.auth)
  const { pathname } = useLocation()
  const toast = useToast()
  const commentId = pathname.split('/')[pathname.split('/').length-1] 
  const contentElementRef = useRef<HTMLDivElement>(null)
  const placeholder = 'Escribe un comentario'

  const navigate = useNavigate()

  if( !user ) {
    navigate('/auth/login')
    return <></> 
  }
  
  const { comment, isLoading } = useComment(commentId)
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

  if( !comment ) {
    navigate('/')
    return <></>
  }

  const onCreateSubcomment = async () => {
    const token = localStorage.getItem('token')
    const content = contentElementRef.current?.innerText

    if( !content || content?.trim() === '' ) return
    if( content === placeholder ) return
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

  return (
    <AppLayout>
      <Grid
        gap='1rem'
        gridTemplateColumns='1fr'
      >
        <Comment comment={comment} />
        <Grid
          gridTemplateColumns='48px 1fr'
          columnGap='.5rem'
          rowGap='1rem'
          p='1rem .5rem'
          bgColor='white'
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
              bgGradient='linear(to-r, blue.400, cyan.400)'
              _hover={{ bgGradient: 'linear(to-r, blue.500, cyan.500)' }}
              onClick={ () => onCreateSubcomment() }
            >
              Agregar comentario
            </Button>
          </Flex>
        </Grid>

        <CommentsList
          comments={comment.comments}
        />
      </Grid>

    </AppLayout>
  )
}