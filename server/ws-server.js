'use strict'

const WebSocketServer = require('ws').Server
const wss = new WebSocketServer({port: 3000})

wss.on('connection', (ws) => {
  console.log('on connection')

  ws.on('message', (mes) => {
    console.log(mes)
    // ws.send(JSON.stringify({ok: 'ack'}))
  })
})
