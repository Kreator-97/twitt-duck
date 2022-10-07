import { Flex, Text, IconButton, Input, Grid, Avatar } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { HiOutlineSearch } from 'react-icons/hi'

export const Navbar = () => {
  return (
    <Flex
      boxShadow="base"
      bg='white'
      justifyContent='center'
    >
      <Grid
        p=".5rem 1rem"
        height="80px"
        justifyContent="space"
        alignItems="center"
        maxWidth="1440px"
        width='100%'
        gridTemplateColumns='300px auto 300px'
      >
        <Flex alignItems="center" gap="1rem">
          <Avatar
            size='md'
            name='Tom holland'
            src='https://res.cloudinary.com/practicaldev/image/fetch/s--i96Gcbyf--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://thepracticaldev.s3.amazonaws.com/uploads/user/profile_image/50592/f46e43c2-f4f0-4787-b34e-a310cecc221a.jpg'
          />
          <Text fontWeight={600} fontSize='xl'>Tom Holland</Text>
        </Flex>

        <RouterLink to= '/'>
          <Text align='center' fontSize='3xl' textDecoration='none' _hover={{textDecoration: 'none'}}>Twitt Duck 🦆</Text>
        </RouterLink>

        <Flex align='center' gap='1rem'>
          <Input placeholder='Buscar' />
          <IconButton
            aria-label='Buscar'
            icon={ <HiOutlineSearch /> }
          ></IconButton>
        </Flex>
      </Grid>
    </Flex>
  )
}
