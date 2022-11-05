import { type WebSocket, type RawData } from "ws"

/**
 * クライアントクラス
 */
class Client {
  private socket: WebSocket
  private id: number
  private broadcastObject: IBroadcast

  /**
   * コンストラクタ
   * @param socket ソケット
   */
  constructor (socket: WebSocket, id: number, broadcastObject: IBroadcast) {
    this.socket = socket
    this.id = id
    this.broadcastObject = broadcastObject
    this.socket.on("message", this.recv)
  }

  /**
   * 送信
   * @param data 送信するデータ
   */
  send (data: any): void {
    data.clientId = this.id
    const json = JSON.stringify(data)
    this.socket.send(json)
  }

  /**
   * 受信
   * @param data 受信したデータ
   */
  private recv (data: RawData): void {
    const obj = JSON.parse(data.toString())
    console.log(obj)  // TODO: ハンドリングする仕組みの実装
  }
  
  /**
   * ブロードキャスト
   * @param data 送信するデータ
   */
  broadcast (data: any): void {
    this.broadcastObject.broadcast(this.id, data)
  }
}

/**
 * ブロードキャストインタフェース
 */
interface IBroadcast {
  /**
   * ブロードキャスト
   * @param from 送信元ID
   * @param data 送信するデータ
   */
  broadcast (from: number, data: any): void
}

/**
 * クライアントマネージャ
 */
export class ClientManager implements IBroadcast {
  private list: Map<number, Client>
  private nextId: number

  /**
   * コンストラクタ
   */
  constructor () {
    this.list = new Map<number, Client>()
    this.nextId = 1
  }

  /**
   * 追加
   * @param socket 接続してきたSocket
   */
  add (socket: WebSocket): void {
    const id = this.nextId++
    const client = new Client(socket, id, this)
    this.list.set(id, client)

    socket.on("close", () => {
      this.list.delete(id)
      this.broadcast(id, { type: 1, clientId: id })
    })
    
    client.broadcast({ type: 0 })
  }

  /**
   * ブロードキャスト
   * @param from 送信元ID
   * @param data 送信するデータ
   */
  broadcast (from: number, data: any): void {
    this.list.forEach((c, id) => {
      if (id !== from) {
        c.send(data)
      }
    })    
  }
}
