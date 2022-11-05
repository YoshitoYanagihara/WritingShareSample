import { WebSocketServer, type WebSocket, type RawData } from "ws"

const server = new WebSocketServer({ port: 3000 })
let nextClientId = 1

server.on("connection", (socket: WebSocket) => {
  const clientId = nextClientId++
  const broadcast = (data: string) => {
    server.clients.forEach((s: WebSocket) => {
      if (s !== socket) {
        s.send(data)
      }
    })
  }
  
  socket.on("message", (msg: RawData) => {
    const data = JSON.parse(msg.toString())
    data.clientId = clientId
    broadcast(JSON.stringify(data))
  })
  socket.on("close", () => {
    broadcast(JSON.stringify({ type: 1, clientId: clientId }))
  })
  broadcast(JSON.stringify({ type: 0, clientId: clientId }))
})
