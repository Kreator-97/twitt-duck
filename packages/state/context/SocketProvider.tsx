import React,{ FC, useEffect } from 'react'
import { useSocket } from '@twitt-duck/hooks'
import { SocketContext } from '.'

interface Props {
  children: React.ReactNode;
}

export const SocketProvider: FC<Props> = ({children}) => {
  const { socket, connectSocket } = useSocket('http://localhost:5000')

  useEffect(() => {
    connectSocket()
  }, [])

  useEffect(() => {
    socket?.on('notification', (payload) => {
      console.log(payload)
    })
  }, [socket])

  return (
    <SocketContext.Provider value={{ socket }}>
      { children }
    </SocketContext.Provider>
  )
}

