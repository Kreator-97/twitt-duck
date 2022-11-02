import { useMemo } from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'
import { useAppDispatch, openSearchBar, useAppSelector } from '@twitt-duck/state'
import { HiOutlineBell, HiOutlineHashtag, HiOutlineHome, HiOutlineSearch, HiOutlineUser } from 'react-icons/hi'
import { BottomBarIcon } from './'

export const BottomBar = () => {
  const dispatch = useAppDispatch()
  const { notifications } = useAppSelector( state => state.notification)

  const notificationsNoRead = useMemo(() => {
    return notifications.filter(notification => !notification.isRead )
  }, [notifications])

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

          <Box
            position='relative'
          >
            <Box
              position='absolute'
              top='0'
              right='-12px'
              borderRadius='100%'
              bgColor='blue.500'
              color='white'
              width='22px'
              height='22px'
              textAlign='center'
              fontSize='sm'
              fontWeight={600}
              zIndex='modal'
              display={ notificationsNoRead?.length === 0 ? 'none' : 'block' }
            >
              <Text>
                { 
                  (notificationsNoRead?.length > 9)
                    ? '+9'
                    : notificationsNoRead?.length
                }
              </Text>
            </Box>
            <BottomBarIcon
              Icon={ HiOutlineBell }
              label='Notificaciones'
              to='/notification'
            />
          </Box>


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
