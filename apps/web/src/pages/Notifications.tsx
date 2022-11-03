import { useEffect, useMemo } from 'react'
import { mutate } from 'swr'
import { Box, Heading, Text } from '@chakra-ui/react'
import { useAppSelector } from '@twitt-duck/state'
import { NotificationCard } from '@twitt-duck/ui'

import { AppLayout } from '../layouts/AppLayout'
import { DBLocal } from '../utils'

export const NotificationPage = () => {
  const { notifications } = useAppSelector(state => state.notification)

  const notificationsNoRead = useMemo(() => {
    return notifications.filter(notification => !notification.isRead )
  }, [notifications])

  const notificationsRead = useMemo(() => {
    return notifications.filter(notification => notification.isRead )
  }, [notifications])

  useEffect(() => {
    const token = DBLocal.getTokenFromLocal()

    if( token ) {
      const timer = setTimeout(() => {
        fetch('http://localhost:5000/api/notification/mark-all-as-read', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }).then(() => {
          mutate(['http://localhost:5000/api/notification', {
            headers: {
              authorization: `Bearer ${token}`
            }
          }])
        })
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <AppLayout>
      <Box
        bgColor='white'
        p={{ base: '2', lg: '4' }}
        boxShadow='md'
        mb={{ base: 2, lg: 4 }}
      >
        <Heading
          fontSize={'md'}
          fontWeight='bold'
          textAlign='center'
          color='#333'
          mb='2'
        >
          Notificaciones
        </Heading>
        <Text
          textAlign='center'
        >Tienes {notificationsNoRead.length} notificaciones no leídas
        </Text>
      </Box>
      {
        notificationsNoRead.map(notification => {
          return (
            <NotificationCard
              key={notification.id}
              notification={notification}
            />
          )
        })
      }
      {
        notificationsRead.map(notification => {
          return (
            <NotificationCard
              key={notification.id}
              notification={notification}
            />
          )
        })
      }
    </AppLayout>
  )
}
