<template>
  <div class="icon">
    <el-tooltip class="tip" effect="dark" placement="top-start" v-bind="$attrs">
      <div class="image-box">
        <Icon v-if="src" :icon="src" class="image" />
        <slot v-else class="image" />
      </div>
    </el-tooltip>
  </div>
</template>
<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps({
  src: {
    // 图标
    type: String,
    default: ''
  }
})
</script>
<style lang="scss" scoped>
.icon {
  .image-box {
    width: 20px;
    height: 26px;
    padding: 3px;
    border-radius: var(--border-radius);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    transition: all 0.2s linear;
    &:hover {
      background: var(--color-icon-hover);
      transition: all 0.2s linear;
    }
    .image {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
