import { FC } from 'react'
import { Avatar, Button, Grid, Text } from '@chakra-ui/react'

interface Props {
  name: string;
  imgURL: string;
  username: string;
}

export const Follow: FC<Props> = ({name, imgURL, username}) => {


  const onFollow = () => {
    console.log(`Hay que seguir al usuario @${username}`)
  }

  return (
    <Grid mb='4' alignItems='center' gap='.5rem' gridTemplateColumns='32px 1fr 60px'>
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
        bgGradient='linear(to-b, cyan.400, teal.200)'
        _hover={{ bgGradient: 'linear(to-b, cyan.600, teal.300)'}}
        onClick={ () => onFollow() }
      >
        Seguir
      </Button>
    </Grid>
  )
}
