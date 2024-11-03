<template>
  <div :class="classes">
    <img :src="src" class="image" />
    <div class="description" v-html="description"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { createNameSpace } from '@/utils/components'
import { props as _props } from './props'

import noDataImage from '@/assets/image/no-data.svg'

const { n } = createNameSpace('empty')
const props = defineProps(_props)

// 结构props列面的值，注意要用toRefs定义，否则解构后会丢失响应性
const { image, description } = toRefs(props)
const src = computed(() => image.value || noDataImage)
const classes = computed(() => [n()])
</script>

<style lang="scss" scoped>
@use './index.scss';
</style>
