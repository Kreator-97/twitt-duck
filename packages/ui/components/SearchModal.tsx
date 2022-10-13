import React from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import { Flex, Modal, ModalContent, ModalOverlay } from '@chakra-ui/react'
import { closeSearchBar, useAppSelector, useAppDispatch } from '@twitt-duck/state'

export const SearchModal = () => {
  const dispatch = useAppDispatch()
  const {  isSearchBarOpen } = useAppSelector(state => state.ui)

  const finalRef = React.useRef(null)

  return (
    <>
      <Modal finalFocusRef={finalRef} isOpen={isSearchBarOpen} onClose={ () => { dispatch(closeSearchBar) }}>
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
