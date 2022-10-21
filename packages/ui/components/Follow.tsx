import { FC } from 'react'
import { Avatar, Button, Grid, Text } from '@chakra-ui/react'

interface Props {
  name: string;
  url?: string;
}

export const Follow: FC<Props> = ({name}) => {
  return (
    <Grid mb='4' alignItems='center' gap='.5rem' gridTemplateColumns='32px 1fr 60px'>
      <Avatar
        size='sm'
        src='https://res.cloudinary.com/practicaldev/image/fetch/s--i96Gcbyf--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://thepracticaldev.s3.amazonaws.com/uploads/user/profile_image/50592/f46e43c2-f4f0-4787-b34e-a310cecc221a.jpg'
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
      >
        Seguir
      </Button>
    </Grid>
  )
}
