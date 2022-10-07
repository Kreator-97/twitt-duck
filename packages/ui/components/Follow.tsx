import { Avatar, Button, Flex, Text } from '@chakra-ui/react'
import { FC } from 'react'

interface Props {
  name: string;
  url?: string;
}

export const Follow: FC<Props> = ({name}) => {
  return (
    <Flex mb='4' align={'center'} justifyContent='space-between'>
      <Avatar
        size='md'
        width={'48px'}
        src='https://res.cloudinary.com/practicaldev/image/fetch/s--i96Gcbyf--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://thepracticaldev.s3.amazonaws.com/uploads/user/profile_image/50592/f46e43c2-f4f0-4787-b34e-a310cecc221a.jpg'
      />
      <Text fontWeight='bold' fontSize='md'>{ name }</Text>
      <Button
        bg='cyan.400'
        size='sm'color='white'
        _hover={{ bg: 'cyan.700'}}>
          Seguir
      </Button>
    </Flex>
  )
}