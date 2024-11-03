<template>
  <component
    :is="tag"
    v-bind="$attrs"
    :href="to"
    :target="target"
    :to="to"
    :class="classes"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { createNameSpace } from '@/utils/components'
import { props as _props } from './props'
import { computed, toRefs } from 'vue'
const { n } = createNameSpace('link')
const props = defineProps(_props)

// 结构props列面的值，注意要用toRefs定义，否则解构后会丢失响应性
const { to, target } = toRefs(props)
const classes = computed(() => [n()])

// 判断当前的路径是否是外链
const isExternalLink = computed(() => {
  return to.value.match(
    /^(http:\/\/|https:\/\/|javascript:.*|tel:.*|mailto:.*)/
  )
})
// 判断使用哪个标签
const tag = computed(() => {
  if (!to.value) return 'span'
  return isExternalLink.value ? 'a' : 'router-link'
})
</script>

<style lang="scss" scoped></style>
