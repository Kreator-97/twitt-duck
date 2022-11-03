import React,{ FC, useEffect } from 'react'
import { useSocket } from '@twitt-duck/hooks'

import { SocketContext } from '.'
import { useAppDispatch } from '../app/hooks';
import { Notification } from '../interfaces';
import { addNotification, removeNotification } from '../app/slices/notificationSlice';

interface Props {
  children: React.ReactNode;
}

export const SocketProvider: FC<Props> = ({children}) => {
  const { socket, connectSocket } = useSocket('http://localhost:5000')
  const dispatch = useAppDispatch()

  useEffect(() => {
    connectSocket()
  }, [])

  useEffect(() => {
    socket?.on('notification', (payload) => {
      console.log({payload})
      dispatch( addNotification( payload as Notification ) )
    })
  }, [socket])

  useEffect(() => {
    socket?.on('remove-notification', (payload) => {
      dispatch( removeNotification( payload.id ) )
    })
  }, [socket])

  return (
    <SocketContext.Provider value={{ socket }}>
      { children }
    </SocketContext.Provider>
  )
}

