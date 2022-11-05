/**
 * ネットワークイベントリスナインタフェース
 */
export interface INetworkEventListener {
  /**
   * 接続された
   * @param clientId クライアントID
   */
  onConnected (clientId: number): void

  /**
   * 切断された
   * @param clientId クライアントID
   */
  onDisconnected (clientId: number): void

  /**
   * 書き込まれた
   * @param clientId クライアントID
   * @param writingId 書き込みID
   * @param d 書き込み
   */
  wrote (clientId: number, writingId: number, d: string): void

  /**
   * 書き込みが削除された
   * @param clientId クライアントID
   * @param writingId 書き込みID
   */
  erased (clientId: number, writingId: number): void
}

/**
 * ネットワーク接続クラス
 */
export class NetworkConnection {
  private connection: WebSocket | null
  private eventListener: INetworkEventListener

  /**
   * コンストラクタ
   */
  constructor (eventListener: INetworkEventListener) {
    this.connection = null
    this.eventListener = eventListener
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
        const data = JSON.parse(e.data)
        switch (data.type) {
          case 0:
            // 接続
            this.eventListener.onConnected(data.clientId)
            break
          case 1:
            // 切断
            this.eventListener.onDisconnected(data.clientId)
            break
          case 2:
            // 書き込まれた
            this.eventListener.wrote(data.clientId, data.id, data.d)
            break
          case 3:
            // 削除された
            this.eventListener.erased(data.clientId, data.id)
            break
        }
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
