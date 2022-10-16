import React from 'react'
import { useAppDispatch, useAppSelector, closeConfirmLogoutModal } from '@twitt-duck/state'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text
} from '@chakra-ui/react'

export const ConfirmLogout = () => {
  const { isConfirmLogoutModalOpen } = useAppSelector(state => state.ui)
  const { user } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  const onClose = () => dispatch( closeConfirmLogoutModal() )
  
  const finalRef = React.useRef(null)
  
  const onLogout = () => {
    onClose()
    window.google.accounts.id.disableAutoSelect()
    window.google.accounts.id.revoke(user?.email || '', () => {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.reload()
    })
  }

  return (
    <div>
      <Modal finalFocusRef={ finalRef } isOpen={ isConfirmLogoutModalOpen } onClose={ onClose }>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cerrar sesión</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>¿Está seguro de cerrar la sesión?</Text>
          </ModalBody>

          <ModalFooter>
            <Button color='white' colorScheme='cyan' mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button color='white' bg='red.400'  onClick={() => onLogout() }>Cerrar sesión</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
