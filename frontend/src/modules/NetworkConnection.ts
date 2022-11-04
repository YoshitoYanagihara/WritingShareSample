/**
 * ネットワークイベントリスナインタフェース
 */
export interface INetworkEventListener {
}

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
        this.connection!.onerror = () => {}
        resolve()
      }
      this.connection.onerror = (e: any) => {
        reject(e)
      }
      this.connection.onmessage = (e: MessageEvent) => {
        console.log(e.data)
      }
    })
  }

  /**
   * 書き込みを送信
   * @param id ID
   * @param d 書き込みデータ
   */
  sendWrite (id: number, d: string): void {
    if (!this.connection) { return }
    this.connection.send(JSON.stringify({
      type: 2,
      id: id,
      d: d,
    }))
  }

  /**
   * 書き込み削除を送信
   * @param id ID
   */
  sendErase (id: number): void {
    if (!this.connection) { return }

    this.connection.send(JSON.stringify({
      type: 3,
      id: id,
    }))
  }
}
