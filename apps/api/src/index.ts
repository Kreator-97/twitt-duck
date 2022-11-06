import { Server } from './classes/Server'

const expressServer = new Server
export const app = expressServer.app
expressServer.listen()
