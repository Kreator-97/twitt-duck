import { useEffect, useMemo } from 'react'
import { Box, Heading, Text } from '@chakra-ui/react'
import { loadNotifications, useAppDispatch, useAppSelector } from '@twitt-duck/state'
import { NotificationCard } from '@twitt-duck/ui'
import { getNotificationsRequest, markAllNotificationsAsReadRequest } from '@twitt-duck/services'

import { AppLayout } from '../layouts/AppLayout'
import { DBLocal } from '../utils'

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
        markAllNotificationsAsReadRequest(token)
          .then(() => {
            getNotificationsRequest(token).then((notifications) => {
              dispatch( loadNotifications(notifications) )
            })
          })
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [])

  const notificationMessage = useMemo(() => {
    const amount = notificationsNoRead.length
    return (amount === 0)
      ? 'No tienes notificaciones nuevas'
      : `Tienes ${amount} ${amount === 1 ? 'notificación' : 'notificaciones' } no leídas`
  }, [notificationsNoRead])

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
        >
          { notificationMessage }
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
