import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Flex, Input, IconButton, FormControl } from '@chakra-ui/react'
import { RiMessage3Line } from 'react-icons/ri'
import { useAppDispatch, openSearchBar } from '@twitt-duck/state'
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
  const [ query, setQuery] = useState('')
  
  const navigate = useNavigate()

  const onSearch = (e: FormEvent ) => {
    e.preventDefault()

    if( query.trim() === '' ) return

    navigate(`/search?query=${query}`)
  }

  return (
    <Flex
      maxWidth='260px'
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
