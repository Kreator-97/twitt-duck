import { createContext } from 'react'
import { Socket } from 'socket.io-client'

interface Props {
  socket: Socket | null;
}

export const SocketContext = createContext<Props>({} as Props)
