import { Box, Flex, Input, IconButton } from '@chakra-ui/react'
import { HiOutlineHome, HiOutlineBell, HiOutlineHashtag, HiOutlineSearch, HiOutlineUser } from 'react-icons/hi'
import { RiMessage3Line } from 'react-icons/ri'
import { ToolbarOption } from './ToolbarOption'

export const Toolbar = () => {
  return (
    <Flex
      direction='column'
      justify='space-between'
      bg='white'
      padding={{sm: '.5rem', lg: '1rem'}}
      boxShadow='md'
      position='sticky'
      top='.5rem'
      left='0'
      display={{ base: 'none', md: 'block' }}
    >
      <Box>
        <ToolbarOption
          Icon={HiOutlineHome}
          title='Home'
          url={'/'}
          active
        />
          
        <ToolbarOption
          Icon={HiOutlineBell}
          title='Notificaciones'
          url={'/notification'}
        />
          
        <ToolbarOption
          Icon={HiOutlineHashtag}
          title='Explorar'
          url={'/explore'}
        />
          
        <ToolbarOption
          Icon={RiMessage3Line}
          title='Mensajes'
          url={'/messages'}
        />
          
        <ToolbarOption
          Icon={HiOutlineUser}
          title='Perfil'
          url={'/profile'}
        />
          
        <Flex align='center' gap='1rem'>
          <IconButton
            aria-label='Buscar'
            icon={ <HiOutlineSearch /> }
          ></IconButton>
          <Input
            placeholder='Buscar'
            display={{sm: 'none', lg: 'block'}}
          />
        </Flex>
      </Box>
    </Flex>
  )
}
