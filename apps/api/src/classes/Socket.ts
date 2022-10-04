import { Server as SocketServer } from 'socket.io'
import { socketController } from '../socket/controller'

export class Socket {

  io: SocketServer
  constructor( io: SocketServer ) {
    this.io = io

    this.runEvents()
  }

  runEvents() {
    this.io.on('connect', socketController)
  }
}
