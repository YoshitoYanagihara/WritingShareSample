<script setup lang="ts">
interface Props {
  writings: Map<number, string>
}
const props = defineProps<Props>()
</script>

<template lang="pug">
svg.otherWritingLayer
  path(
      v-for="kv in props.writings"
      :key="kv[0]"
      :d="kv[1]"
      fill="none"
      class="pen"
      :id="kv[0]"
      style="stroke: #000000; stroke-width: 8px;"
    )
</template>

<style lang="sass" scoped>
.otherWritingLayer
  pointer-events: none
  position: absolute
  left: 0
  top: 0
  width: 100%
  height: 100%
</style>
