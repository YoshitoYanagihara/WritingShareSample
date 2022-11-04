/**
 * ネットワーク接続クラス
 */
export class NetworkConnection {
  private connection: WebSocket | null

  /**
   * コンストラクタ
   */
  constructor () {
    this.connection = null
  }

  /**
   * 接続
   */
  connect (): Promise<void> {
    return new Promise((resolve, reject) => {
      this.connection = new WebSocket("ws://127.0.0.1:3000")
      this.connection.onopen = () => {
        this.connection?.send(JSON.stringify({ message: "Hello" }))
        resolve()
      }
      this.connection.onerror = (e: any) => {
        reject(e)
      }
    })
  }
}
