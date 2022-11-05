import { WebSocketServer, type WebSocket, type RawData } from "ws"
import { ClientManager } from "./modules/client"

const server = new WebSocketServer({ port: 3000 })
const clientManager: ClientManager = new ClientManager()

server.on("connection", (socket: WebSocket) => {
  clientManager.add(socket)
})
