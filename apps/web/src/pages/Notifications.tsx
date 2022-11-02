import { Box, Heading, Text } from '@chakra-ui/react'
import { useAppSelector } from '@twitt-duck/state'
import { AppLayout } from '../layouts/AppLayout'

export const NotificationPage = () => {
  const { notifications } = useAppSelector(state => state.notification)

  return (
    <AppLayout>
      <Box
        bgColor='white'
        p={{ base: '2', md: '4' }}
        boxShadow='md'
      >
        <Heading
          fontSize={'md'}
          fontWeight='bold'
          textAlign='center'
          color='#333'
        >
          Notificaciones
        </Heading>
        <Text
          textAlign='center'
        >Tienes {notifications.length} notificaciones no leídas
        </Text>
      </Box>
    </AppLayout>
  )
}
