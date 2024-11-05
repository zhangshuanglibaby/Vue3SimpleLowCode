<template>
  <div :class="classes" :style="displayStyle">
    <!-- 此时的class 其实就是 s-image -->
    <SLink v-if="src" :to="link" target="_blank">
      <img
        v-bind="$attrs"
        :src="src"
        :display="display"
        class="image"
        :style="styles"
        alt=""
      />
    </SLink>
    <div v-else class="no-image">
      <SEmpty description="暂无图片，请上传" />
    </div>
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

import SLink from '@/components/SLink/index.vue'
import SEmpty from '@/components/SEmpty/index.vue'

const { n } = createNameSpace('image')
const props = defineProps(_props)
const platform = inject('platform')

// 结构props列面的值，注意要用toRefs定义，否则解构后会丢失响应性
const { data, viewport } = toRefs(props)
const display = computed(() => {
  const display = data.value?.display?.[viewport.value]
  return typeof display === 'boolean' ? display : true
})
const src = computed(() => data.value?.src?.[viewport.value] || '')
const link = computed(() => data.value?.link?.[viewport.value] || '')
const width = computed(() => data.value?.width?.[viewport.value] || '')
const height = computed(() => data.value?.height?.[viewport.value] || '')
const classes = computed(() => [n()])
const styles = computed(() => ({ width: width.value, height: height.value }))

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
