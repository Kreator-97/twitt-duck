import express, { Express } from 'express'
import { createServer, Server as HTTPServer} from 'http'
import { Server as SocketServer } from 'socket.io'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'

import { Socket } from './Socket'
import {
  AuthRouter,
  CommentRouter,
  FollowRouter,
  FeedRouter,
  PostRouter,
  ProfileRouter,
  RepostRouter,
  SuggestedPeopleRouter,
  UploadRouter,
  UserRouter,
  SearchRouter,
  NotificationRouter,
  DBRouter
} from '../routes'
// import { resetDB } from '../controllers/resetController'

dotenv.config()

export class Server {
  app   : Express
  port  : number
  server: HTTPServer
  io    : SocketServer

  constructor() {
    this.app    = express()
    this.port   = Number( process.env.PORT ) || 5000
    this.server = createServer(this.app)
    this.io     = new SocketServer( this.server, {
      cors: { origin: '*' }
    })

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
    this.app.use('/api/auth/',    AuthRouter )
    this.app.use('/api/post/',    PostRouter )
    this.app.use('/api/profile/', ProfileRouter )
    this.app.use('/api/upload/',  UploadRouter )
    this.app.use('/api/user/',    UserRouter )
    this.app.use('/api/comment/', CommentRouter )
    this.app.use('/api/repost/',  RepostRouter )
    this.app.use('/api/follow/',  FollowRouter )
    this.app.use('/api/feed/',    FeedRouter )
    this.app.use('/api/search/',  SearchRouter )
    this.app.use('/api/notification/', NotificationRouter )
    this.app.use('/api/suggested-people/', SuggestedPeopleRouter )
    this.app.use('/api/db/', DBRouter )
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
