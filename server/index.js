const WebSocketServer = require("ws").Server

const server = new WebSocketServer({ port: 3000 })

server.on("connection", socket => {
  const broadcast = (data) => {
    server.clients.forEach(s => {
      if (s !== socket) {
        s.send(data)
      }
    })
  }
  
  socket.on("message", msg => {
    broadcast(msg.toString())
  })
})
