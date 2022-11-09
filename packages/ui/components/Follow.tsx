import { FC, useContext, useMemo } from 'react'
import { Avatar, Box, Button, Grid, Text } from '@chakra-ui/react'
import { createFollow, mutateFollows, unfollowRequest } from '@twitt-duck/services'
import { NotificationPayload, SocketContext, useAppSelector } from '@twitt-duck/state'
import { useFollow } from '@twitt-duck/hooks'
import { Link } from 'react-router-dom'

interface Props {
  name        : string;
  imgURL      : string;
  username    : string;
  description?: string;
}

export const Follow: FC<Props> = ({name, imgURL, username, description}) => {
  const { user } = useAppSelector(state => state.auth)
  const { socket } = useContext(SocketContext)

  if( !user ) {
    console.error('usuario invalido')
    return <></>
  }

  const { following } = useFollow(user.username)

  const isFollowing = useMemo(() => following.some(follow => follow.followingTo.username === username ), [following])

  const onFollow = async () => {
    const token = localStorage.getItem('token')

    if( isFollowing ) {
      try {
        await unfollowRequest(username, token || '')
        mutateFollows(user.username)
        return
      } catch (error) {
        console.log(error)
      }
    }

    try {
      await createFollow(username, token || '')
      mutateFollows(user.username)

      const notification: NotificationPayload = {
        id: username,
        type: 'user',
        isNew: false,
        msg: 'nuevo seguidor',
      }

      socket?.emit('user-notification-follower', notification)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Grid
      alignItems='center'
      gap='0 .5rem'
      gridTemplateColumns='48px 1fr auto'
      boxShadow='md'
      bgColor='white'
      p='2'
    >
      <Avatar
        size='md'
        src={imgURL}
      />
      <Box>

        <Text
          title={name}
          maxHeight='1.4rem'
          fontWeight='bold'
          fontSize='sm'
          textOverflow='ellipsis'
          overflow='hidden'
          display='block'
        >
          <Link to={`/user/${username}`} >
            <Text
              as='span'
              _hover={{ color: 'blue.500' }}
            >
              { name }
            </Text>
          </Link>
        </Text>
        <Text
          title={username}
          maxHeight='1.4rem'
          fontWeight='400'
          fontSize='sm'
          textOverflow='ellipsis'
          overflow='hidden'
          display='block'
        >
          <Link
            to={`/user/${username}`}
          >
            <Text
              as='span'
              _hover={{ color: 'blue.500' }}
            >
              @{ username }
            </Text>
          </Link>
        </Text>
      </Box>
      <Button
        boxShadow='md'
        size='sm'
        color='#fff'
        bgGradient='linear(to-r, blue.400, cyan.400)'
        _hover={{ bgGradient: 'linear(to-r, blue.500, cyan.500)' }}
        onClick={ () => onFollow() }
      >
        {
          (isFollowing) ? 'Siguiendo' : 'Seguir'
        }
      </Button>
      <Box />
      <Text
        fontSize='sm'
        color='gray.500'
      >{ description }</Text>
    </Grid>
  )
}
