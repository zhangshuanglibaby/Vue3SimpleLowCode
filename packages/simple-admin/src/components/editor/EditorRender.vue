<template>
  <div class="editor-render" :style="pageStyle" :class="pageClass">
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
import { computed, ref, watch } from 'vue';
import { useEditorStore } from '@/stores/editor';

import type { IBaseBlock } from '@/types/editor';
import { dragGroup } from './nested';

const editorStore = useEditorStore();
const list = ref<IBaseBlock[]>([]);

/**
 * 这两个watch 其实就是在中间编辑器拖动了组件进来时，需要更新右侧配置区的数据(新增)
 * 在右侧配置区更改了数据之后，同时中间编辑器的数据也要更新
 */
watch(
  () => list.value,
  val => {
    console.log(val, '======>val');
    editorStore.setBlockConfig(val);
  },
  {
    deep: true
  }
);
watch(
  () => editorStore.blockConfig,
  val => {
    list.value = val;
  },
  {
    deep: true
  }
);

const pageStyle = computed(() => {
  return {};
});

const pageClass = computed(() => {
  return {};
});
</script>
<style lang="scss" scoped>
.editor-render {
  container-type: inline-size; // 定义容器查询
  position: relative;
  width: calc(100vw - var(--editor-block-width));
  min-height: calc(100vh - var(--editor-header-height));
  margin-left: var(--editor-block-width);
  margin-top: var(--editor-header-height);
  // background: #ffffff;
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
