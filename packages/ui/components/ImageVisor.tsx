import { Image, Modal, ModalCloseButton, ModalContent, ModalOverlay } from '@chakra-ui/react'
import { closeVisorImage, useAppDispatch, useAppSelector } from '@twitt-duck/state'

export const ImageVisor = () => {
  const { imageVisor } = useAppSelector(state => state.ui)
  const dispatch = useAppDispatch()

  const onClose = () => {
    dispatch(closeVisorImage())
  }
  
  return (
    <>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={ imageVisor.isOpen }
        motionPreset='slideInBottom'
        size={{ base: 'xl', md: '2xl', lg: '3xl' }}
      >
        <ModalOverlay
          backgroundColor='blackAlpha.600'
          backdropFilter='blur(1px)'
        />
        <ModalContent boxShadow='none' rounded='md' p='.5rem' backgroundColor='transparent'>
          <ModalCloseButton color='white' bgColor='#333' borderRadius='100%' _hover={{ bgColor: 'red.400' }} />
          <Image
            rounded='md'
            src={ imageVisor.imageURL }
            maxH='95vh'
          />
        </ModalContent>
      </Modal>
    </>
  )
}
