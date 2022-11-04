<script setup lang="ts">
import { ref } from "vue"

const pageCount = ref(1)
</script>

<template lang="pug">
div
  .root
    .page
      span Page: {{ pageCount }}
</template>

<style lang="sass" scoped>
.root
  width: 95vw
  height: 95vh
  .page
    display: flex
    justify-content: center
    align-items: center
    width: 100%
    height: 100%
</style>
