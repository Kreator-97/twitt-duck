import { FC } from 'react'
import { Avatar, Button, Grid, Text } from '@chakra-ui/react'
import { createFollow } from '@twitt-duck/services'
import { useAppSelector } from '@twitt-duck/state'
import { mutate } from 'swr'
import { useFollow } from '@twitt-duck/hooks'

interface Props {
  name: string;
  imgURL: string;
  username: string;
}

export const Follow: FC<Props> = ({name, imgURL, username}) => {
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
      mb='4'
      alignItems='center'
      gap='.5rem'
      gridTemplateColumns='32px 1fr auto'
    >
      <Avatar
        size='sm'
        src={imgURL}
      />
      <Text
        title={name}
        maxHeight='1.4rem'
        fontWeight='bold'
        fontSize='sm'
        textOverflow='ellipsis'
        overflow='hidden'
      >
        { name }
      </Text>
      <Button
        boxShadow='md'
        size='sm'
        color='#fff'
        bgGradient='linear(to-r, blue.400, cyan.400)'
        _hover={{ bgGradient: 'linear(to-r, blue.500, cyan.500)'}}
        onClick={ () => onFollow() }
      >
        {
          following.some(follow => follow.followingTo.username === username )
            ? 'Siguiendo'
            : 'Seguir'
        }
      </Button>
    </Grid>
  )
}
