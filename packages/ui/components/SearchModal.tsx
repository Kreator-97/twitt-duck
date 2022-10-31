import React, { FormEvent, useState } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { Flex, FormControl, Modal, ModalContent, ModalOverlay } from '@chakra-ui/react'
import { closeSearchBar, useAppSelector, useAppDispatch } from '@twitt-duck/state'

export const SearchModal = () => {
  const dispatch = useAppDispatch()
  const { isSearchBarOpen } = useAppSelector(state => state.ui)
  const [ query, setQuery] = useState('')
  
  const navigate = useNavigate()

  const finalRef = React.useRef(null)

  const onSearch = (e:FormEvent) => {
    e.preventDefault()

    if( query === '' ) return
    navigate(`/search?query=${query}`)
    setQuery('')
    dispatch(closeSearchBar())
  }

  return (
    <>
      <Modal finalFocusRef={finalRef} isOpen={isSearchBarOpen} onClose={ () => { dispatch(closeSearchBar()) }}>
        <ModalOverlay />
        <ModalContent>
          <Flex gap={4} p='1rem' alignItems='center'>
            <HiOutlineSearch size='28px' />
            <FormControl
              as='form'
              onSubmit={ onSearch }
            >
              <input
                placeholder='Buscar'
                style={{ width: '100%'}}
                value={query}
                onChange={ (e) => setQuery(e.target.value) }
              />
            </FormControl>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  )
}
