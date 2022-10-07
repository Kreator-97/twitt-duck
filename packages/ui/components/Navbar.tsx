import { Link, Flex, Text, Image } from '@chakra-ui/react'
import {  } from '@chakra-ui/react'

export const Navbar = () => {
  return (
    <Flex
      boxShadow="base"
      bg='white'
      mb={4}
      justify='center'
    >
      <Flex
        p=".5rem"
        height="80px"
        justifyContent="space-between"
        alignItems="center"
        maxWidth="1440px"
        width='100%'
      >
        <Link fontSize='3xl' textDecoration='none' _hover={{textDecoration: 'none'}}>Twitt Duck 🦆</Link>

        <Flex gap="1rem">
          <Link fontSize='xl'>Home</Link>
          <Link fontSize='xl'>Explorar</Link>
          <Link fontSize='xl'>Notificaciones</Link>
        </Flex>

        <Flex alignItems="center" gap=".5rem">
          <Text fontWeight={600}>Tom Holland</Text>
          <Image
            src='https://res.cloudinary.com/practicaldev/image/fetch/s--i96Gcbyf--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://thepracticaldev.s3.amazonaws.com/uploads/user/profile_image/50592/f46e43c2-f4f0-4787-b34e-a310cecc221a.jpg'
            width="48px"
            height="48px"
            rounded="full"
          />
        </Flex>
      </Flex>
    </Flex>
  )
}
