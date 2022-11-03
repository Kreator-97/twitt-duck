import { FC } from 'react'
import { mutate } from 'swr'
import { useNavigate } from 'react-router-dom'
import { HiOutlineTrash } from 'react-icons/hi'
import { Box, Flex, Grid, Icon, Text } from '@chakra-ui/react'
import { Notification } from '@twitt-duck/state'
import { deleteNotificationRequest } from '@twitt-duck/services'

interface Props {
  notification: Notification;
}

const mutateNotifications = (token: string) => mutate(['http://localhost:5000/api/notification', {
  headers: {
    authorization: `Bearer ${token}`
  }
}])

export const NotificationCard: FC<Props> = ({notification}) => {
  const url = `/${notification.type?.toLowerCase()}/${notification.postId}`
  const navigate = useNavigate()

  const onNotificationDelete = async (notificationId: string) => {
    const token = localStorage.getItem('token')
    if( !token ) return

    await deleteNotificationRequest(notificationId, token || '')
    mutateNotifications(token)
  }

  const onNotificationRead = (notificationId: string, url: string) => {
    const token = localStorage.getItem('token')
    if( token ) {
      fetch(`http://localhost:5000/api/notification/${notificationId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(() => {
        navigate(url)
        mutateNotifications(token)
      })
    }
  }

  return (
    <Flex
      bgColor='white'
      boxShadow='md'
      p={{ base: 2, lg: 4 }}
      mb={{ base: 2, lg: 4 }}
      justify='space-between'
      alignItems='center'
    >
      <Grid
        gap={{base: '.5rem', md: '1rem' }}
        alignItems='center'
        gridTemplateColumns={{ base: '1fr', lg: 'auto 1fr' }}
      >
        <Flex gap='.5rem' alignItems='center'>
          <Box
            bgColor={ notification.isRead ? 'white' : 'blue.500' }
            border='2px solid'
            borderColor='blue.500'
            top='0'
            right='0'
            width='12px'
            height='12px'
            rounded='full'
          />
          <Text
            as='span'
            color='blue.500'
            onClick={ () => onNotificationRead(notification.id, url) }
            cursor='pointer'
          >
            <Text> Ver notificación </Text>
          </Text>
        </Flex>
        <Text>
          { notification.title }
        </Text>
      </Grid>
      <Icon
        as={HiOutlineTrash}
        boxSize='24px'
        color='#333'
        cursor='pointer'
        onClick={ () => onNotificationDelete(notification.id) }
      />
    </Flex>
  )
}
