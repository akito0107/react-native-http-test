'use strict'

const Hapi = require('hapi')

const server = new Hapi.Server()
server.connection({ port: 3080 })

server.route([{
  method: 'GET',
  path: '/ping',
  handler: (req, rep) => {
    console.log(`request received: ${req}`)
    rep('pong')
  }
}, {
  method: 'POST',
  path: '/sensor',
  handler: (req, rep) => {
    console.log(req.payload)
    rep({success: 'ok'})
  }
}])

server.start((err) => {
  if (err) {
    throw err
  }
  console.log(`server running at: ${server.info.uri}`)
})
