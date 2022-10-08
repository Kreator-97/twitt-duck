import { Box, Flex } from '@chakra-ui/react'
import { HiOutlineBell, HiOutlineHashtag, HiOutlineHome, HiOutlineSearch, HiOutlineUser } from 'react-icons/hi'
import { RiMessage3Line } from 'react-icons/ri'
import { BottomBarIcon } from './'

export const BottomBar = () => {
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
          active
        />

        <BottomBarIcon
          Icon={ HiOutlineBell }
          label='Notificaciones'
        />

        <BottomBarIcon
          Icon={ HiOutlineHashtag }
          label='Explorar'
        />

        <BottomBarIcon
          Icon={ HiOutlineUser }
          label='Perfil'
          to='/profile'
        />

        <BottomBarIcon
          Icon={ RiMessage3Line }
          label='Mensajes'
        />

        <BottomBarIcon
          Icon={ HiOutlineSearch }
          label='Buscar'
        />
      </Flex>
    </Box>
  )
}
