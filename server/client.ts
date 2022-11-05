import { type WebSocket } from "ws"

/**
 * クライアントクラス
 */
export class Client {
  private socket: WebSocket

  /**
   * コンストラクタ
   * @param socket ソケット
   */
  constructor (socket: WebSocket) {
    this.socket = socket
  }
}
