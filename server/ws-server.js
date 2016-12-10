'use strict'

const WebSocketServer = require('ws').Server
const wss = new WebSocketServer({port: 3000})
const Transform = require('stream').Transform;
const Writable = require('stream').Writable;
const net = require('net');

const stream = new Transform({
  transform: function(chunk, enc, cb) {
    let data;
    try {
      data = JSON.parse(chunk);
    } catch (e){
      return cb(null);
    }
    let {x, y, z} = data.message.acceleration;
    this.push(JSON.stringify({x, y, z}));
    cb(null)
  }
});

wss.on('connection', (ws) => {
  console.log('on connection')
  ws.on('message', (mes) => {
    stream.write(mes);
  });
});

const server = net.createServer((socket) => {
  stream.pipe(socket);
  socket.on('data', (data) => {
    console.log(`Bin Server Got Data: ${data}`);
  });

}).listen({port: 12345}, () => {
  console.log(`Bin Server Started`)
});

stream.pipe(new Writable({
  write: function(chunk, enc, cb) {
    console.log(`Writable Got: ${chunk}`)
    cb(null);
  }
}));
