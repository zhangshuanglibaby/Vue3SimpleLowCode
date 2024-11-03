<template>
  <div :class="classes" :style="styles">
    <div
      v-for="(colWidth, index) in cols"
      :key="index"
      :style="colStyles(colWidth)"
      class="item"
    >
      <!-- 需要把子级的信息暴露给宿主环境 -->
      <slot :item="itemComputed(index)" :index="index"></slot>
    </div>
  </div>
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
const { data, viewport, children } = toRefs(props)
const cols = computed(() => data.value?.cols?.[viewport.value] || '')
const background = computed(
  () => data.value?.background?.[viewport.value] || ''
)
const styles = computed(() => ({ background: background.value }))
const colStyles = computed(() => (colWidth: number | string) => ({
  width: Number(colWidth) * 100 + '%'
}))
const itemComputed = computed(
  () => (index: number) => children.value?.[viewport.value]?.[index] || []
)
</script>

<style lang="scss" scoped>
@use './index.scss';
</style>
