<script setup lang="ts">
import { ref } from "vue"

const emits = defineEmits<{
  (e: "onwrite", id: number, d: string): void
  (e: "onerase", id: number): void
}>()

const layerRef = ref()
let nextId = 1
const writings = []

/**
 * マウス押下
 */
const onMouseDown = (e: MouseEvent) => {
  if (e.buttons === 1) {
    onWrite(e)
  } else if (e.buttons === 2) {
    onErase(e)
  }
}

/**
 * ペン
 */
const onWrite = (e: MouseEvent) => {
  const id = nextId++
  const element = document.createElementNS("http://www.w3.org/2000/svg", "path")
  element.setAttribute("fill", "none")
  element.setAttribute("class", "pen")
  element.setAttribute("id", `${id}`)
  element.style.stroke = "#000000"
  element.style.strokeWidth = "8px"
  let d = `M ${e.offsetX},${e.offsetY} `
  element.setAttribute("d", d)
  layerRef.value.appendChild(element)
  writings.push(element)
  
  const onMouseMove = (ev: MouseEvent) => {
    d += `L ${ev.offsetX},${ev.offsetY} `
    element.setAttribute("d", d)
  }

  const onMouseUp = () => {
    emits("onwrite", id, d)
    
    document.removeEventListener("mousemove", onMouseMove)
    document.removeEventListener("mouseup", onMouseUp)
  }

  document.addEventListener("mousemove", onMouseMove)
  document.addEventListener("mouseup", onMouseUp)
}

/**
 * 消しゴム
 */
const onErase = (e: MouseEvent) => {
  const exec = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    const className = target.getAttribute("class")
    if (className === "pen") {
      const id = Number(target.getAttribute("id"))
      layerRef.value.removeChild(target)
      emits("onerase", id)
    }
  }

  const onMouseUp = () => {
    document.removeEventListener("mousemove", exec)
    document.removeEventListener("mouseup", onMouseUp)
  }
  document.addEventListener("mousemove", exec)
  document.addEventListener("mouseup", onMouseUp)
  exec(e)
}
</script>

<template lang="pug">
svg.writingLayer(ref="layerRef" @mousedown="onMouseDown" @contextmenu="(e) => { e.preventDefault() }")
</template>

<style lang="sass" scoped>
.writingLayer
  position: absolute
  left: 0
  top: 0
  width: 100%
  height: 100%
</style>
