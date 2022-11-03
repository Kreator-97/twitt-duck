import { FC } from 'react'
import { mutate } from 'swr'
import { Avatar, Box, Button, Grid, Text } from '@chakra-ui/react'
import { createFollow } from '@twitt-duck/services'
import { useAppSelector } from '@twitt-duck/state'
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

  if( !user ) {
    console.error('usuario invalido')
    return <></>
  }

  const { following } = useFollow(user.username)

  const onFollow = async () => {
    const token = localStorage.getItem('token')
    try {
      await createFollow(username, token || '')
      mutate(`http://localhost:5000/api/follow/${user?.username}`)
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
          following.some(follow => follow.followingTo.username === username )
            ? 'Siguiendo'
            : 'Seguir'
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
