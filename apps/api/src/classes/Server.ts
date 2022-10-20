import express, { Express } from 'express'
import { createServer, Server as HTTPServer} from 'http'
import { Server as SocketServer } from 'socket.io'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'

import { AuthRouter, PostRouter, ProfileRouter, UploadRouter } from '../routes'
import { Socket } from './Socket'

dotenv.config()

export class Server {
  app: Express
  port: number
  server: HTTPServer
  io: SocketServer

  constructor() {
    this.app    = express()
    this.port   = Number( process.env.PORT ) || 5000
    this.server = createServer(this.app)
    this.io     = new SocketServer( this.server )

    // set middlewares
    this.middleware()

    // configure routes
    this.routes()

    // run socket controller
    this.sockets()
  }

  middleware() {
    this.app.use( cors() )
    this.app.use( express.json() )
    this.app.use( express.static('./src/public') )
    this.app.use( morgan('dev') )
  }

  routes() {
    this.app.use('/api/auth/', AuthRouter )
    this.app.use('/api/post/', PostRouter )
    this.app.use('/api/profile/', ProfileRouter )
    this.app.use('/api/upload/', UploadRouter )
  }

  sockets () {
    new Socket(this.io)
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Server is running at http://localhost:${ this.port }`)
    })
  }
}
