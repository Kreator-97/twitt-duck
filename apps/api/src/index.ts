import { Server } from './classes/Server'

const expressServer = new Server
export const app = expressServer.app

app.get('/auth/*', (req, res) => {
  res.redirect('/')
})

app.get('/user/*', (req, res) => {
  res.redirect('/')
})

app.get('/profile/*', (req, res) => {
  res.redirect('/')
})

if( process.env.NODE_ENV !== 'test' ) {
  expressServer.listen()
}
