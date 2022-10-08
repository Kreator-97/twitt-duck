import { Flex, Text, IconButton, Input, Grid } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { HiOutlineSearch } from 'react-icons/hi'

import { UserAvatar } from './UserAvatar'

export const Navbar = () => {
  return (
    <Flex
      boxShadow="base"
      bg='white'
      justifyContent='center'
    >
      <Grid
        gap='.5rem'
        p={{base: '.5rem', lg: '.5rem'}}
        height="72px"
        justifyContent="space"
        alignItems="center"
        maxWidth="1440px"
        width='100%'
        gridTemplateColumns={{base: 'auto 1fr auto', lg: 'repeat(3, auto)'}}
      >
        <Flex alignItems="center" gap="1rem">
          <UserAvatar name='tom holland' imgURL='' to='/profile' />
          <Text
            display={{base: 'none', lg: 'block'}}
            fontWeight={600}
            fontSize='lg'
          >Tom Holland</Text>
        </Flex>

        <Text
          align='center'
          fontSize={{base: 'xl', md: '2xl' }}
          textDecoration='none'
          _hover={{textDecoration: 'none'}}
        >
          <RouterLink to= '/'>
            Twitt Duck 🦆
          </RouterLink>
        </Text>

        <Flex justifyContent='end' gap='1rem'>
          <Input placeholder='Buscar' display={{base: 'none', lg: 'block' }} maxWidth='300px' />
          <IconButton
            aria-label='Buscar'
            icon={ <HiOutlineSearch /> }
          ></IconButton>
        </Flex>
      </Grid>
    </Flex>
  )
}
