<template>
  <div :class="classes" :style="[displayStyle, positionStyle]">
    <div v-html="text" class="text ql-editor" :style="styles" :class="{ 'no-value': !text }"></div>
  </div>
</template>

<script setup lang="ts">
/**
 * 因为这个图片在 业务端渲染时，是可以点击跳转的，因此需要有跳转操作
 *
 */
import { computed, toRefs, inject } from 'vue'
import { createNameSpace } from '@/utils/components'
import { props as _props } from './props'

const { n } = createNameSpace('text')
const props = defineProps(_props)
const platform = inject('platform')

// 结构props列面的值，注意要用toRefs定义，否则解构后会丢失响应性
const { data, viewport, parent } = toRefs(props)
const display = computed(() => {
  const display = data.value?.display?.[viewport.value]
  return typeof display === 'boolean' ? display : true
})

const inCanvas = computed(() => parent.value === 'canvas')
const classes = computed(() => [
  n(),
  { 'in-canvas': inCanvas.value, 'platform-user': platform === 'user' }
])
const text = computed(() => data.value?.text?.[viewport.value] || '')
const width = computed(() => data.value?.width?.[viewport.value] || '')
const height = computed(() => data.value?.height?.[viewport.value] || '')
const top = computed(() => data.value?.top?.[viewport.value] || '')
const left = computed(() => data.value?.left?.[viewport.value] || '')
const styles = computed(() => {
  return { width: width.value, height: height.value }
})
const positionStyle = computed(() => {
  if(platform !== 'editor') {
    return { top: top.value, left: left.value }
  }
  return {}
})

const displayStyle = computed(() => {
  if (platform === 'editor') {
    return !display.value ? { opacity: 0.4, filter: 'brightness(0.7)' } : {}
  } else {
    return !display.value ? { display: 'none' } : {}
  }
})
</script>

<style lang="scss" scoped>
@use './index.scss';
</style>
