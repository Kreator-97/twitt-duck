import { useCallback, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

export const useSocket = (url: string) => {
  const [ socket, setSocket ] = useState<Socket | null>(null)
  const [ online, setOnline] = useState(false)
  const token = localStorage.getItem('token')
  
  const disconnectSocket = () => {
    socket?.disconnect()
    setSocket(null)
  }

  const connectSocket = useCallback( () => {
    const socket = io(url, {
      extraHeaders: {
        'token': token || '',
      }
    })
    setSocket(socket)
  }, [url])

  useEffect(() => {
    setOnline( socket?.connected || false)
  }, [socket])

  useEffect(() => {
    socket?.on('connect', () => setOnline(true))
  }, [socket])

  useEffect(() => {
    socket?.on('disconnect', () => setOnline(false) )
  }, [])

  return {
    connectSocket,
    disconnectSocket,
    online,
    socket,
  }
}
