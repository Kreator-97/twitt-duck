import { FC, useRef } from 'react'
import { Box, Heading, Image, useToast } from '@chakra-ui/react'
import { useAppDispatch, User, login } from '@twitt-duck/state'
import { updateUserBackgroundRequest, uploadMultipleImagesRequest } from '@twitt-duck/services'

interface Props {
  user: User;
  setIsLoading: (value: boolean) => void
}

export const ChangeBackgroundPicture: FC<Props> = ({user, setIsLoading}) => {
  const backgroundPicInputRef = useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()
  const toast = useToast()

  const onChangeBackgroundPicture = async () => {
    setIsLoading(true)
    const files = backgroundPicInputRef.current?.files
    if( !files ) return

    const token = localStorage.getItem('token')
    if( !token ) return console.error('token no existe')

    try {
      const images = await uploadMultipleImagesRequest(files, token || '')
      const imgURL = await updateUserBackgroundRequest(images[0], token || '')

      dispatch(login({...user, backgroundPic: imgURL }))
      localStorage.setItem('user', JSON.stringify({...user, backgroundPic: imgURL}))
      setIsLoading(false)

      toast({
        title: 'imagen de fondo actualizada',
        status: 'success',
        position: 'top',
        isClosable: true,
        duration: 3000,
      })
    } catch (error) {
      setIsLoading(false)
      console.log(error)
      if( typeof error === 'string' ) {
        toast({
          title: 'Ocurrió un error al intentar cambiar la imagen',
          description: error,
          status: 'error',
          position: 'top',
          isClosable: true,
          duration: 3000,
        })
      }
    }
  }

  return (
    <Box>
      <Image
        src={ user.backgroundPic ? user.backgroundPic : '/images/default-bg.jpg' }
        cursor='pointer'
        onClick={ () => backgroundPicInputRef.current?.click() }
      />
      <Heading
        fontSize='sm'
        color='gray.500'
        as='h3'
        textAlign='center'
        py='2'
      >
        Haz click en la imagen para cambiarla
      </Heading>
      <input
        multiple={false}
        type='file'
        accept='.jpg, .jpeg, .png, .webp'
        ref={backgroundPicInputRef}
        style={{ display: 'none' }}
        onChange={ () => onChangeBackgroundPicture() }
      />
    </Box>
  )
}
