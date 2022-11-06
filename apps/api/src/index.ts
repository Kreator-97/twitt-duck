import { Server } from './classes/Server'

const expressServer = new Server
export const app = expressServer.app

if( process.env.NODE_ENV !== 'test' ) {
  expressServer.listen()
}
