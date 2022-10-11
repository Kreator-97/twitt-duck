import { Box, Flex } from '@chakra-ui/react'
import { HiOutlineBell, HiOutlineHashtag, HiOutlineHome, HiOutlineSearch, HiOutlineUser } from 'react-icons/hi'
import { RiMessage3Line } from 'react-icons/ri'
import { BottomBarIcon } from './'
import { useContext} from 'react'
import { UIContext } from '../context/UIContext'

export const BottomBar = () => {
  const { openSearchBar } = useContext( UIContext )
  return (
    <Box
      width={'100vw'}
      display={{ base: 'block', md: 'none'}}
      position='fixed'
      bottom={0}
      left={0}
    >
      <Flex
        bg={'white'}
        boxShadow='inner'
        padding='.5rem'
        borderTop='1px solid #ddd'
        justifyContent='space-evenly'
      >
        <BottomBarIcon
          Icon={ HiOutlineHome }
          label='Home'
          to='/'
        />

        <BottomBarIcon
          Icon={ HiOutlineBell }
          label='Notificaciones'
          to='/notification'
        />

        <BottomBarIcon
          Icon={ HiOutlineHashtag }
          label='Explorar'
          to='/explore'
        />

        <BottomBarIcon
          Icon={ RiMessage3Line }
          label='Mensajes'
          to='/messages'
        />

        <BottomBarIcon
          Icon={ HiOutlineUser }
          label='Perfil'
          to='/profile'
        />

        <BottomBarIcon
          Icon={ HiOutlineSearch }
          label='Buscar'
          onClick={ () => openSearchBar() }
        />
      </Flex>
    </Box>
  )
}
