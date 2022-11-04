const WebSocketServer = require("ws").Server

const server = new WebSocketServer({ port: 3000 })

server.on("connection", socket => {
  socket.on("message", data => {
    console.log(data)
  })
})
