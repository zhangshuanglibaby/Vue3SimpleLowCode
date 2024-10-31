<template>
  <el-select
    v-model="model"
    placeholder="请选择"
    :style="styles"
    @change="change"
  >
    <el-option label="移动端" value="mobile"></el-option>
    <el-option label="桌面端" value="desktop"></el-option>
  </el-select>
</template>
<script setup lang="ts">
import { computed, defineModel } from 'vue'

const props = defineProps({
  width: {
    type: Number,
    default: 100
  }
})

const styles = computed(() => ({ width: props.width + 'px' }))

const model = defineModel()
const change = (value: string) => {
  model.value = value
}
</script>
<style lang="scss" scoped>
:deep(.el-select__popper) {
  border-radius: var(--border-radius);
  top: 34px !important;
}
:deep(.el-select-dropdown__list) {
  padding: 3px 0;
}
:deep(.el-select-dropdown__item) {
  border-radius: var(--border-radius);
  margin: 0 3px;
  padding: 0 44px 0 8px;
}
:deep(&.is-hovering) {
  background-color: var(--color-black-hover);
}
:deep(.el-select__wrapper:hover) {
  box-shadow: none !important;
}
:deep(.el-select__wrapper) {
  box-shadow: none !important;
  min-height: 28px;
  background-color: var(--color-black-hover);
}
:deep(.el-select__wrapper.is-hovering) {
  background-color: var(--color-black-hover);
}
:deep(.el-select__wrapper.is-focused) {
  background-color: var(--color-black-hover);
}
</style>
