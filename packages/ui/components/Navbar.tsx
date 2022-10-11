import { Flex, Text, IconButton, Input, Grid } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { HiOutlineSearch } from 'react-icons/hi'
import { useContext } from 'react'

import { UserAvatar } from './UserAvatar'
import { UIContext } from '../context/UIContext'

export const Navbar = () => {
  const { openSearchBar } = useContext(UIContext)

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
        gridTemplateColumns={{base: 'auto 1fr auto', lg: 'auto 1fr auto'}}
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

        <Flex justifyContent='end' gap='1rem' maxWidth='250px'>
          <Input placeholder='Buscar' display={{base: 'none', lg: 'block' }} />
          <IconButton
            aria-label='Buscar'
            icon={ <HiOutlineSearch /> }
            onClick={ () => openSearchBar() }
          ></IconButton>
        </Flex>
      </Grid>
    </Flex>
  )
}
