import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { HiOutlineSearch } from 'react-icons/hi'
import { HamburgerIcon } from '@chakra-ui/icons'

import {
  useAppDispatch,
  openSearchBar,
  openConfirmLogoutModal
} from '@twitt-duck/state'

import {
  Flex,
  Text,
  IconButton,
  Input,
  Grid,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from '@chakra-ui/react'

import { ConfirmLogout } from './'

export const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  return (
    <Flex
      boxShadow="base"
      bg='white'
      justifyContent='center'
    >
      <Grid
        gap='.5rem'
        p={{base: '.5rem', lg: '1rem'}}
        height="72px"
        justifyContent="space"
        alignItems="center"
        maxWidth="1440px"
        width='100%'
        gridTemplateColumns={{base: 'auto 1fr auto', lg: '240px 1fr 240px'}}
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
              <MenuItem onClick={ () => navigate('/profile') }>
                Ver perfil
              </MenuItem>
              <MenuItem
                color='red.300'
                onClick={ () => dispatch( openConfirmLogoutModal() ) }
              >
                Cerrar sesión
              </MenuItem>
            </MenuList>
          </Menu>
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
