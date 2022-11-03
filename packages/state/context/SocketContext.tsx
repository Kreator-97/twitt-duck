import { createContext } from 'react'
import { Socket } from 'socket.io-client'

interface Props {
  socket: Socket | null;
  reloadSocket: () => void;
}

export const SocketContext = createContext<Props>({} as Props)
