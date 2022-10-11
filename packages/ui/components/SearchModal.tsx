import React, { useContext } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import { Flex, Modal, ModalContent, ModalOverlay } from '@chakra-ui/react'

import { UIContext } from '../context/UIContext'

export const SearchModal = () => {
  const { isSearchBarOpen, closeSearchBar } = useContext(UIContext)
  
  const finalRef = React.useRef(null)

  return (
    <>
      <Modal finalFocusRef={finalRef} isOpen={isSearchBarOpen} onClose={closeSearchBar}>
        <ModalOverlay />
        <ModalContent>
          <Flex gap={4} p='1rem' alignItems='center'>
            <HiOutlineSearch size='28px' />
            <input placeholder='Buscar' style={{ width: '100%'}} />
          </Flex>
        </ModalContent>
      </Modal>
    </>
  )
}
