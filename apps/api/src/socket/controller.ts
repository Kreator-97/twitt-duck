import { Socket } from 'socket.io'

export const socketController = (socket:Socket) => {
  console.log('Cliente conectado', socket.id)

  socket.emit('welcome', 'Bienvenido al server')
}
