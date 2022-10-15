import { Flex, Text, IconButton, Input, Grid } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { HiOutlineSearch } from 'react-icons/hi'
import { useAppDispatch, openSearchBar } from '@twitt-duck/state'
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'

import { ConfirmLogout } from './ConfirmLogout'
import { openConfirmLogoutModal } from '@twitt-duck/state/app/slices/uiSlice'

export const Navbar = () => {
  const dispatch = useAppDispatch()

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
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label='Options'
              icon={<HamburgerIcon />}
              variant='outline'
            />
            <MenuList>
              <MenuItem><RouterLink to='/profile' >Ver perfil</RouterLink></MenuItem>
              <MenuItem></MenuItem>
              <MenuItem color='red.300' onClick={ () => dispatch( openConfirmLogoutModal() ) }>Cerrar sesión</MenuItem>
            </MenuList>
          </Menu>
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
            onClick={ () => dispatch(openSearchBar()) }
          ></IconButton>
        </Flex>
      </Grid>
      <ConfirmLogout />
    </Flex>
  )
}
