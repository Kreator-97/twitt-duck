import { useAppDispatch, openSearchBar } from '@twitt-duck/state'
import { Box, Flex } from '@chakra-ui/react'
import { HiOutlineBell, HiOutlineHashtag, HiOutlineHome, HiOutlineSearch, HiOutlineUser } from 'react-icons/hi'
import { BottomBarIcon } from './'

export const BottomBar = () => {
  const dispatch = useAppDispatch()

  return (
    <Box
      width={'100vw'}
      display={{ base: 'block', md: 'none'}}
      position='fixed'
      bottom={0}
      left={0}
      zIndex='banner'
      boxShadow='sm'
      bg={'white'}
      padding='.5rem'
      borderTop='1px solid #eee'
    >
      <Box
        maxW='400px'
        margin='0 auto'
      >
        <Flex
          justifyContent='space-around'
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
            Icon={ HiOutlineUser }
            label='Perfil'
            to='/profile'
          />

          <BottomBarIcon
            Icon={ HiOutlineSearch }
            label='Buscar'
            onClick={ () => dispatch(openSearchBar()) }
          />
        </Flex>
      </Box>
    </Box>
  )
}
