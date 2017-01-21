'use strict'

const WebSocketServer = require('ws').Server
const wss = new WebSocketServer({ port: 3000 })
const Transform = require('stream').Transform;
const net = require('net');

const stream = new Transform({
  transform: function (chunk, enc, cb) {
    let data;
    try {
      data = JSON.parse(chunk);
    } catch (e) {
      return cb(null);
    }
    this.push(data.message)
    cb()
  },
  objectMode: true
});

wss.on('connection', (ws) => {
  console.log('on connection')
  ws.on('message', (mes) => {
    console.log(`got message: ${mes}`);
    stream.write(mes);
  });
});

const server = net.createServer((socket) => {
  socket.once('data', (data) => {
    try {
      const dataJson = JSON.parse(data);
      if (!dataJson.id) throw new Error('id not found');
      
      const adapter = new Transform({
        transform: function(chunk, enc, cb) {
          if (chunk.id === dataJson.id) {
            this.push(JSON.stringify(chunk));
          }
          cb(null);
        },
        objectMode: true
      })
      stream.pipe(adapter)
      adapter.pipe(socket)
    } catch (e) {
      console.error(e)
    }
    console.log(`Bin Server Got Data: ${data}`);
  });
  
}).listen({ port: 12345 }, () => {
  console.log(`Bin Server Started`)
});

