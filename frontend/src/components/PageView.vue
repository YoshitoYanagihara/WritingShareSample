<script setup lang="ts">
import { ref } from "vue"
import WritingLayer from "./writings/WritingLayer.vue"

const pageCount = ref(1)

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
</script>

<template lang="pug">
.pageView
  .page
    span Page: {{ pageCount }}
  .leftButton
    PrimeButton(@click="onPrevPage") ←
  .rightButton
    PrimeButton(@click="onNextPage") →
  WritingLayer(@onwrite="onWrite" @onerase="onErase")
</template>

<style lang="sass" scoped>
.pageView
  position: relative
  width: 99vw
  height: 95vh

  .page
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
