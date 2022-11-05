import { useEffect, useMemo } from 'react'
import { Box, Heading, Text } from '@chakra-ui/react'
import { loadNotifications, useAppDispatch, useAppSelector } from '@twitt-duck/state'
import { NotificationCard } from '@twitt-duck/ui'
import { getNotificationsRequest } from '@twitt-duck/services'

import { AppLayout } from '../layouts/AppLayout'
import { DBLocal } from '../utils'

const BASE_URL = import.meta.env.VITE_BASE_URL || ''

export const NotificationPage = () => {
  const dispatch = useAppDispatch()
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
        // TODO: make service of this fetch
        fetch(`${BASE_URL}/api/notification/mark-all-as-read`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }).then(() => {
          getNotificationsRequest(token).then((notifications) => {
            dispatch( loadNotifications(notifications) )
          })
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
