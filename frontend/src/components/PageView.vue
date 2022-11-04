<script setup lang="ts">
import { ref, onMounted } from "vue"
import WritingLayer from "./writings/WritingLayer.vue"
import { NetworkConnection } from "@/modules/NetworkConnection"

const pageCount = ref(1)
const connection = new NetworkConnection()
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
  console.log(id, d)
}

/**
 * 書き込みが消えた
 */
const onErase = (id: number) => {
  console.log("erase", id)
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
