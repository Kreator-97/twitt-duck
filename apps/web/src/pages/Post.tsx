import { useRef } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { Box, Button, Flex, Grid, Text, useToast } from '@chakra-ui/react'
import { Loader, Post, UserAvatar } from '@twitt-duck/ui'
import { useAppSelector } from '@twitt-duck/state'
import { createComment } from '@twitt-duck/services'
import { PostActions } from '@twitt-duck/ui/components/PostActions'
import { mutate } from 'swr'

import { usePost } from '../hooks/usePost'
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

  const onLikeCompleted = () => {
    console.log('mutando')
    mutate(`http://localhost:5000/api/post/${post.id}`)
  }

  return (
    <AppLayout>
      <Post post={post} onLikeCompleted={onLikeCompleted} />

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

      <Box
        bgColor='white'
        boxShadow='md'
      >
        {
          post.comments.map( comment => {
            const { author } = comment
            return (
              <Grid
                p='1rem .5rem'
                border='1px solid #EEE'
                key={comment.id}
                gridTemplateColumns='48px 1fr'
                gap='.5rem'
                alignItems='center'
              >
                <Box>
                  <UserAvatar
                    imgURL={author.profilePic}
                    name={author.fullname}
                  />
                </Box>
                <Box>
                  <Text>
                    { author.fullname + ' - ' }
                    <Text color='gray.500' as='span'>@{author.username}
                    </Text>
                  </Text>
                  <Text
                    color='gray.500'
                  >
                    { 'En respuesta a ' }
                    <Text
                      as='span'
                      color='cyan.500'
                    >
                      <Link
                        to={`/user/${post.author.username}`}
                      >
                        @{ post.author.username }
                      </Link>
                    </Text>
                  </Text>
                </Box>
                <Box />
                <Box
                  minHeight='3rem'
                >
                  <Text>{ comment.content }</Text>
                </Box>
                <Box />
                {/* FIXME: fix this on schema */}
                <PostActions
                  onLikeCompleted={ onLikeCompleted }
                  postId={post.id}
                  comments={ [] }
                  likes={[]}
                  reposts={0}
                />
              </Grid>
            )
          })
        }
      </Box>
    </AppLayout>
  )
}
