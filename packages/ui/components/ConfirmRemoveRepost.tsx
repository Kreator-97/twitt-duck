import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react'
import { useAppDispatch, useAppSelector, closeRemoveRepostModal } from '@twitt-duck/state'

export const ConfirmRemoveRepost = () => {
  const { isRemoveRepostModalIpen } = useAppSelector( state => state.ui )
  const dispatch = useAppDispatch()

  const onClose = () => {
    dispatch( closeRemoveRepostModal() )
  }
  
  const onConfirm = () => {
    console.log('quitar esta difunsión')
    dispatch( closeRemoveRepostModal() )
  }

  return (
    <>
      <Modal
        isOpen={isRemoveRepostModalIpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmación</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text>¿Esta seguro de dejar de difundir esta publicación?</Text>
          </ModalBody>
    
          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={ onConfirm }>
              Quitar difunsión
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
  
