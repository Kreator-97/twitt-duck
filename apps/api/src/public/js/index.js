import { io } from 'https://cdn.socket.io/4.4.1/socket.io.esm.min.js'

const socket = io('http://localhost:5000')

socket.on('connect', () => {
  console.log('conectado')
})
