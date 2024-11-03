<template>
  <div :class="classes"></div>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { createNameSpace } from '@/utils/components'
import { props as _props } from './props'

// 创建专属的类名
const { n } = createNameSpace('image')
const classes = computed(() => [n()])
const props = defineProps(_props)

// 结构props列面的值，注意要用toRefs定义，否则解构后会丢失响应性
const { data, viewport } = toRefs(props)
const src = computed(() => data.value?.src?.[viewport.value] || '')
</script>

<style lang="scss" scoped>
@use './index.scss';
</style>
