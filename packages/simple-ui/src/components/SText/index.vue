<template>
  <div :class="classes" :style="displayStyle">
    <div v-html="text" class="text ql-editor" :class="{ 'no-value': !text }"></div>
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
const { data, viewport } = toRefs(props)
const display = computed(() => {
  const display = data.value?.display?.[viewport.value]
  return typeof display === 'boolean' ? display : true
})
const text = computed(() => data.value?.text?.[viewport.value] || '')
const classes = computed(() => [n()])

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
