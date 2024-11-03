<template>
  <Draggable
    :list="list"
    :group="group"
    :sort="sort"
    :animation="200"
    item-key="id"
    class="editor-render-drag"
    ghost-class="ghost-class"
    drag-class="drag"
    :move="move"
  >
    <template #item="{ element }">
      <div class="element">
        <!-- activeClass激活的样式 viewport记录是哪端 -->
        <div
          class="block-render"
          :class="activeClass(element)"
          @click.stop="editorStore.setCurrentSelect(element)"
        >
          <component
            :is="element.code"
            :data="element.formData"
            :viewport="editorStore.viewport"
          />
        </div>
      </div>
    </template>
  </Draggable>
</template>
<script setup lang="ts">
import { useEditorStore } from '@/stores/editor';
import { move } from './nested';
import { computed } from 'vue';

defineOptions({
  name: 'editor-render-drag'
});
defineProps({
  list: {
    type: Array,
    required: true,
    default: () => []
  },
  group: {
    type: [String, Object],
    default: 'group'
  },
  sort: {
    type: Boolean,
    default: true
  },
  level: {
    // 判断嵌套层级的 level等级
    type: Number,
    default: 1
  }
});

const editorStore = useEditorStore();

// 激活选中组件的样式
const activeClass = computed(() => {
  return (element: { id: string }) => {
    // 获取状态管理存储的当前的组件id
    const currentId = editorStore.currentSelect?.id;
    return { 'is-active': element.id === currentId };
  };
});
</script>
<style lang="scss" scoped>
.editor-render-drag {
  width: 100%;
  height: 100%;
  .element {
    position: relative;
  }
  .ghost-class {
    background-color: red !important;
  }
  .ghost {
    //   // height: 40px;
    // border: 1px solid var(--color-active-text) !important;
    // background-color: red !important;
    //   // background-color: rgba(64, 158, 255, 0.3);
    //   // display: flex;
    //   // flex-direction: column;
    //   // align-items: center;
    //   // justify-content: center;
  }
  .nested-item {
    border: 1px solid var(--color-edit-render-block-border);
    background: var(--color-edit-render-block-bg);
    height: 100%;
    min-height: inherit;
    & + .nested-item {
      border-left: 0;
    }
  }
  .block-nested-render,
  .block-render {
    cursor: grab;
    &.active {
      cursor: grabbing;
    }
  }
  .block-nested-render {
    &:hover,
    &.is-active {
      // 注意不能像blcok-render做成affter，否则组件无法拖入嵌套容器里
      border: 1px dashed var(--color-edit-render-block-hover);
    }
  }
  .block-render {
    position: relative;
    &:hover,
    &.is-active {
      // 在表面蒙上一层，加上边框，放置组件可以交互
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: 1px dashed var(--color-edit-render-block-hover);
      }
    }
  }
}
</style>
