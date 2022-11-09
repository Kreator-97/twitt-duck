import { FC } from 'react'
import { deleteRepostRequest } from '@twitt-duck/services'
import { useAppDispatch, useAppSelector, closeRemoveRepostModal } from '@twitt-duck/state'

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast
} from '@chakra-ui/react'

interface Props {
  onSuccess?: (repostId: string) => void
}

export const ConfirmRemoveRepost: FC<Props> = ({onSuccess}) => {
  const toast = useToast()
  const { isRemoveRepostModalOpen } = useAppSelector( state => state.ui )
  const dispatch = useAppDispatch()

  const onClose = () => {
    dispatch( closeRemoveRepostModal() )
  }
  
  const onConfirm = async () => {
    const repostId = isRemoveRepostModalOpen.repostId
    if( !repostId ) return

    const token = localStorage.getItem('token')

    try {
      dispatch( closeRemoveRepostModal() )
      await deleteRepostRequest(repostId, token || '')
      onSuccess && onSuccess(repostId)
      toast({
        title: 'Has dejado de difundir esta publicación',
        isClosable: true,
        duration: 3000,
        position: 'top',
        status: 'success'
      })
    } catch (error) {
      console.error(error)
      toast({
        title: 'No se pudo completar la acción',
        isClosable: true,
        duration: 3000,
        position: 'top',
        status: 'error'
      })
    }
  }

  return (
    <>
      <Modal
        isOpen={isRemoveRepostModalOpen.isOpen}
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
            <Button
              bgColor='red.400'
              color='white'
              mr={3}
              onClick={ onConfirm }
              _hover={{ bgColor:'red.600', color: 'white' }}
            >
              Quitar difusión
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
