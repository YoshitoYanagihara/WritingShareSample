const WebSocketServer = require("ws").Server

const server = new WebSocketServer({ port: 3000 })

server.on("connection", socket => {
  console.log("Connected!")
  socket.on("close", () => {
    console.log("Closed...")
  })
})
