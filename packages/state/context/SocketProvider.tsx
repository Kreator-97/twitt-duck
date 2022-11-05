import React,{ FC, useEffect } from 'react'
import { useSocket } from '@twitt-duck/hooks'
import { getNotificationsRequest } from '@twitt-duck/services';

import { SocketContext } from '.'
import { useAppDispatch } from '../app/hooks';
import { removeNotification, loadNotifications } from '../app/slices/notificationSlice';

interface Props {
  children: React.ReactNode;
}

const BASE_URL = import.meta.env.VITE_BASE_URL || ''

export const SocketProvider: FC<Props> = ({children}) => {
  const { socket, connectSocket, reloadSocket } = useSocket(`${BASE_URL}/`)
  const dispatch = useAppDispatch()

  useEffect(() => {
    connectSocket()
  }, [])

  useEffect(() => {
    socket?.on('notification', async (payload) => {
      const token = localStorage.getItem('token')
      if( token ) {
        try {
          const notifications = await getNotificationsRequest(token)
          dispatch( loadNotifications(notifications) )
        } catch (error) {
          console.error(error)
        }
      }
    })
  }, [socket])

  useEffect(() => {
    socket?.on('remove-notification', (payload) => {
      dispatch( removeNotification( payload.id ) )
    })
  }, [socket])

  return (
    <SocketContext.Provider value={{ socket, reloadSocket }}>
      { children }
    </SocketContext.Provider>
  )
}

