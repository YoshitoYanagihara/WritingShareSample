<script setup lang="ts">
import { ref } from "vue"

const pageCount = ref(1)

/**
 * 前のページに戻る
 */
const onPrevPage = () => {
  pageCount.value = Math.max(1, pageCount.value - 1)
}

const onNextPage = () => {
  pageCount.value = Math.min(pageCount.value + 1, 10)
}
</script>

<template lang="pug">
div
  .root
    .page
      span Page: {{ pageCount }}
    .leftButton
      PrimeButton(@click="onPrevPage") ←
    .rightButton
      PrimeButton(@click="onNextPage") →
</template>

<style lang="sass" scoped>
.root
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
