<template>
  <div :class="classes" :style="[displayStyle, styles]">
    <div class="item" :style="[itemStyle]">
      <slot :item="itemComputed"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs, inject } from 'vue'
import { createNameSpace } from '@/utils/components'
import { props as _props } from './props'

const { n } = createNameSpace('canvas')
const props = defineProps(_props)
const platform = inject('platform')

// 结构props列面的值，注意要用toRefs定义，否则解构后会丢失响应性
const { data, viewport, children } = toRefs(props)
const display = computed(() => {
  const display = data.value?.display?.[viewport.value]
  return typeof display === 'boolean' ? display : true
})
const classes = computed(() => [n()])

const itemComputed = computed(() => children.value[0] || [])

const background = computed(() => data.value.background?.[viewport.value] || '')
const height = computed(() => data.value.height?.[viewport.value] || '')
const styles = computed(() => [{ background: background.value }])
const itemStyle = computed(() => [ { height: height.value }])

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
