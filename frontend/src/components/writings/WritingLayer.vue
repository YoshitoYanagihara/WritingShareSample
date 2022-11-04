<script setup lang="ts">
import { ref } from "vue"

const layerRef = ref()

/**
 * マウス押下
 */
const onMouseDown = (e: MouseEvent) => {
  const element = document.createElementNS("http://www.w3.org/2000/svg", "path")
  element.setAttribute("fill", "none")
  element.style.stroke = "#000000"
  element.style.strokeWidth = "8px"
  let d = `M ${e.offsetX},${e.offsetY} `
  element.setAttribute("d", d)
  layerRef.value.appendChild(element)
  
  const onMouseMove = (ev: MouseEvent) => {
    d += `L ${ev.offsetX},${ev.offsetY} `
    element.setAttribute("d", d)
  }

  const onMouseUp = () => {
    document.removeEventListener("mousemove", onMouseMove)
    document.removeEventListener("mouseup", onMouseUp)
  }

  document.addEventListener("mousemove", onMouseMove)
  document.addEventListener("mouseup", onMouseUp)
}
</script>

<template lang="pug">
svg.writingLayer(ref="layerRef" @mousedown="onMouseDown")
</template>

<style lang="sass" scoped>
.writingLayer
  position: absolute
  left: 0
  top: 0
  width: 100%
  height: 100%
</style>
