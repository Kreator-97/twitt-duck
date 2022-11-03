import { useState, FormEvent, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Flex, Input, IconButton, FormControl, Text } from '@chakra-ui/react'
import { useAppDispatch, openSearchBar, useAppSelector } from '@twitt-duck/state'
import {
  HiOutlineHome,
  HiOutlineBell,
  HiOutlineHashtag,
  HiOutlineSearch,
  HiOutlineUser
} from 'react-icons/hi'

import { ToolbarOption } from './ToolbarOption'

export const Toolbar = () => {
  const dispatch = useAppDispatch()
  const { notifications } = useAppSelector( state => state.notification)

  const [ query, setQuery] = useState('')
  const navigate = useNavigate()

  const notificationsNoRead = useMemo(() => {
    return notifications.filter(notification => !notification.isRead )
  }, [notifications])

  const onSearch = (e: FormEvent ) => {
    e.preventDefault()

    if( query.trim() === '' ) return

    navigate(`/search?query=${query}`)
  }

  return (
    <Flex
      maxWidth='280px'
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
        />
          
        <Box
          position='relative'
        >
          <ToolbarOption
            Icon={HiOutlineBell}
            title='Notificaciones'
            url={'/notification'}
          />
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
        </Box>
          
        <ToolbarOption
          Icon={HiOutlineHashtag}
          title='Explorar'
          url={'/explore'}
        />
          
        <ToolbarOption
          Icon={HiOutlineUser}
          title='Perfil'
          url={'/profile'}
        />
        
        <FormControl as='form'
          onSubmit={ onSearch }
        >
          <Flex align='center' gap='1rem'>
            <IconButton
              aria-label='Buscar'
              icon={ <HiOutlineSearch /> }
              type='submit'
              display={{base: 'none', lg: 'inline-flex'}}
            />
            <IconButton
              display={{base: 'inline-flex', lg: 'none'}}
              aria-label='Buscar'
              icon={ <HiOutlineSearch /> }
              onClick={ () => dispatch(openSearchBar()) }
            />
            <Input
              placeholder='Buscar'
              display={{sm: 'none', lg: 'block'}}
              onChange={ (e) => setQuery(e.target.value) }
            />
          </Flex>
        </FormControl>
      </Box>
    </Flex>
  )
}
