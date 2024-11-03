<template>
  <div class="icon">
    <el-tooltip
      class="tip"
      effect="dark"
      placement="top-start"
      v-bind="$attrs"
      :content="content"
    >
      <div class="image-box">
        <Icon v-if="icon" :icon="iconComputed" class="image" />
        <slot v-else class="image" />
      </div>
    </el-tooltip>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { Icon } from '@iconify/vue';
import iconConfig, { type IconConfigKey } from '@/config/icon';

const props = defineProps({
  icon: {
    // 图标
    type: String,
    default: ''
  },
  // 内容
  content: {
    type: String,
    default: ''
  }
});

const iconComputed = computed(() => iconConfig[props.icon as IconConfigKey]);
</script>
<style lang="scss" scoped>
.icon {
  --border-radius: 4px;
  .image-box {
    width: 26px;
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
