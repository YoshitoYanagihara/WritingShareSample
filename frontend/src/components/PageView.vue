<script setup lang="ts">
import { ref, reactive, onMounted } from "vue"
import WritingLayer from "./writings/WritingLayer.vue"
import OtherWritingLayer from "./writings/OtherWritingLayer.vue"
import { NetworkConnection } from "@/modules/NetworkConnection"
import type { INetworkEventListener } from "@/modules/NetworkConnection"

const others: Map<number, Map<number, string>> = reactive(new Map<number, Map<number, string>>())

const networkEvents: INetworkEventListener = {
  onConnected: function (clientId: number): void {
    const map = new Map<number, string>()
    others.set(clientId, map)
  },
  onDisconnected: function (clientId: number): void {
    others.delete(clientId)
  },
  wrote: function (clientId: number, writingId: number, d: string): void {
    others.get(clientId)!.set(writingId, d)
  },
  erased: function (clientId: number, writingId: number): void {
    others.get(clientId)!.delete(writingId)
  }
}

const pageCount = ref(1)
const connection = new NetworkConnection(networkEvents)
const isConnecting = ref(true)

/**
 * 前のページに戻る
 */
const onPrevPage = () => {
  pageCount.value = Math.max(1, pageCount.value - 1)
}

/**
 * 次のページへ進む
 */
const onNextPage = () => {
  pageCount.value = Math.min(pageCount.value + 1, 10)
}

/**
 * 書き込まれた
 */
const onWrite = (id: number, d: string) => {
  connection.sendWrite(id, d)
}

/**
 * 書き込みが消えた
 */
const onErase = (id: number) => {
  connection.sendErase(id)
}

onMounted(async () => {
  try {
    await connection.connect()
    console.log("Network Connection Success!")
    isConnecting.value = false
  } catch (error: any) {
    alert("Network Error!")
    console.error(error)
  }
})
</script>

<template lang="pug">
.pageView
  div(v-if="!isConnecting")
    .page
      span Page: {{ pageCount }}
    .leftButton
      PrimeButton(@click="onPrevPage") ←
    .rightButton
      PrimeButton(@click="onNextPage") →
    WritingLayer(@onwrite="onWrite" @onerase="onErase")
    OtherWritingLayer(
      v-for="kv in others"
      :key="kv[0]"
      :writings="kv[1]"
    )
  .connecting(v-else)
    span Connecting...
</template>

<style lang="sass" scoped>
.pageView
  position: relative
  width: 99vw
  height: 95vh

  .page, .connecting
    display: flex
    justify-content: center
    align-items: center
    width: 100%
    height: 100%

  .leftButton
    position: absolute
    left: 0
    top: 0
    height: 100%
    display: flex
    align-items: center

  .rightButton
    position: absolute
    right: 0
    top: 0
    height: 100%
    display: flex
    align-items: center
</style>
