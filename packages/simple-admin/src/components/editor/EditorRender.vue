<template>
  <div class="editor-render">
    <!-- 渲染区 -->
    <EditorRenderDrag :list="list" :group="dragGroup" class="render" />
    <!-- 空展示 -->
    <el-empty
      v-if="!list.length"
      description="请在左侧拖入组件到此处"
      class="empty"
    >
      <template #image>
        <VIcon icon="dragBlank" class="icon" />
      </template>
    </el-empty>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

import type { IBaseBlock } from '@/types/editor';
import { dragGroup } from './nested';

const list = ref<IBaseBlock[]>([]);
</script>
<style lang="scss" scoped>
.editor-render {
  container-type: inline-size; // 定义容器查询
  position: relative;
  width: 100%;
  min-height: calc(100vh - var(--editor-header-height));
  margin-left: var(--editor-block-width);
  margin-top: var(--editor-header-height);
  background: #ffffff;
  &.is-mobile {
    width: 375px;
    overflow: hidden;
    margin-left: auto;
    margin-right: auto;
    margin-top: calc(var(--editor-header-height) + 20px);
    margin-bottom: 20px;
    transform: translateX(10px);
  }
  .empty {
    position: absolute;
    z-index: 0;
    top: 0;
    width: inherit;
  }
  .render {
    position: relative;
    z-index: 1;
    width: 100%;
    height: calc(100vh - var(--editor-header-height));
  }
}
</style>
