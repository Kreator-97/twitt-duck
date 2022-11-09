import { FC, useContext, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { Box, Button, Grid, Image, Text } from '@chakra-ui/react'
import { SocketContext, useAppSelector, User } from '@twitt-duck/state'
import { HiUser } from 'react-icons/hi'
import { createFollow, unfollowUser } from '../utils'
import { mutateFollows } from '@twitt-duck/services'

interface Props {
  user?: User;
}

export const UserDetail: FC<Props> = ({ user }) => {
  const { socket } = useContext(SocketContext)
  const { pathname } = useLocation()
  const { user: userAuth } = useAppSelector(state => state.auth)

  const isFollowing = useMemo( () => user?.followers.some(
    (follower) => follower.userId === userAuth?.id
  ), [user, userAuth])

  const onFollow = async () => {
    const token = localStorage.getItem('token')

    if( !user ) return
    if( !userAuth ) return
    if( !token ) return

    try {
      await createFollow(user.username, token, socket)
      mutateFollows(userAuth.username)
    } catch (error) {
      console.error(error)
    }
  }

  const onUnfollow = async () => {
    const token = localStorage.getItem('token')

    if( !user ) return
    if( !userAuth ) return
    if( !token ) return

    try {
      await unfollowUser(user.username, token, socket)
      mutateFollows(userAuth.username)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Grid
      templateColumns={{ base: '48px 1fr', md: '64px 1fr 48px 48px'}}
      maxW='1080'
      m={{ base: '-50px auto .5rem', md: '-50px auto 1rem' }}
      p={{ base: '.5rem', md: '1rem' }}
      bg='white'
      boxShadow='md'
      rounded='md'
      gap={{ base: '.5rem', md: '1rem' }}
    >
      {
        user?.profilePic
          ? (
            <Image
              objectFit='cover'
              width={{ base: '48px' , md: '60px' }}
              height={{ base: '48px' , md: '60px' }}
              src={user.profilePic}
              rounded='md'
            />
          )
          : (
            <HiUser width='32px' size='32px' color='#333' />
          )
      }
      <Box>
        <Grid
          gap='.25rem'
          minHeight='1.5rem'
          alignItems='baseline'
        >
          <Text
            as='h1'
            fontWeight={'bold'}
            fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
          >
            { user?.fullname || 'Usuario' }
            <span> - </span>
            <Text
              as='span'
              fontWeight='light'
              color='gray.500'
            >
              @{ user?.username || '' }
            </Text>
          </Text>
          <Text
            as='p'
            fontWeight={'normal'}
            fontSize={{ base: 'sm' }}
          >
            <Text
              as='span'
              style={{ fontWeight: 'bold' }}
            > { user?.followers.length }
            </Text> Seguidores -
            <Text
              as='span'
              style={{ fontWeight: 'bold' }}
            > { user?.following.length }
            </Text> Siguiendo
          </Text>
        </Grid>
        <Text
          as='p'
          fontWeight='light'
          color='gray.600'
          fontSize={{ base: 'sm' }}
        >{ user?.description || 'Sin descripción' }</Text>
      </Box>

      <Box
        width='100%'
        display='block'
        gridColumnStart='span 2'
      >
        <Button
          size='sm'
          width='100%'
          display={ pathname.startsWith('/profile') ? 'none' : 'block' }
          color='#fff'
          bgGradient='linear(to-r, blue.400, cyan.400)'
          _hover={{ bgGradient: 'linear(to-b, blue.500, cyan.500)'}}
          onClick={() => isFollowing ? onUnfollow() : onFollow() }
        >
          { isFollowing ? 'Siguiendo' : 'Seguir' }
        </Button>
      </Box>
    </Grid>
  )
}
