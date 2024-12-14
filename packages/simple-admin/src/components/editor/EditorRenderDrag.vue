<template>
  <Draggable
    :list="list"
    :group="group"
    :sort="sort"
    :animation="200"
    item-key="id"
    class="editor-render-drag"
    ghost-class="ghost-class"
    :move="move"
  >
    <template #item="{ element }">
      <div v-if="element.nested && level < 2" class="element">
        <!--
        nested 为true，表示要渲染嵌套组件(容器组件)
        level < 2 表示此时是可以嵌套进来的
        需要把children传递出去
        放置嵌套组件的数据混乱，增加key属性
        因为容器组件的内容是插槽，渲染的东西交给宿主环境，因此这里放的还是拖拽组件自己本身
        记得要更新 level的数据，要加上nestedClass类名用来判定是否可以拖入
       -->
        <!-- activeClass激活的样式 viewport记录是哪端 -->
        <div
          class="block-nested-render"
          :class="activeClass(element)"
          @click.stop="editorStore.setCurrentSelect(element)"
          @mouseenter="hoverId = element.id"
          @mouseleave="hoverId = ''"
        >
          <!-- <Transition
            v-show="hoverId === element.id"
            :id="element.id"
            :name="element.name"
            @copy="copy"
            @clear="clear"
          ></Transition> -->
          <Transition name="fade">
            <EditorRenderHover
              v-show="hoverId === element.id"
              :id="element.id"
              :name="element.name"
              @copy="copy"
              @clear="clear"
            />
          </Transition>
          <component
            :key="element.id"
            :is="renderComponentCode(element)"
            :data="element.formData"
            :viewport="editorStore.viewport"
            :children="element.children"
          >
            <template #default="{ item, index }">
              <EditorRenderCanvas
                v-if="element.code === 'canvas'"
                :key="element.id + '-canvas-' + index"
                :list="item"
                :parent="element.code"
                class="nested-item"
              />
              <EditorRenderDrag
                v-else
                :key="element.id + '-' + index"
                :list="item"
                :group="group"
                :sort="sort"
                :level="level + 1"
                class="nested-item"
                :class="nestedClass"
                :parent="element.code"
              />
            </template>
          </component>
        </div>
      </div>
      <div v-else class="element">
        <!-- 简单渲染 -->
        <!-- activeClass激活的样式 viewport记录是哪端 -->
        <div
          class="block-render"
          :class="activeClass(element)"
          @click.stop="editorStore.setCurrentSelect({...element, parent})"
          @mouseenter="hoverId = element.id"
          @mouseleave="hoverId = ''"
        >
          <Transition name="fade">
            <EditorRenderHover
              v-show="hoverId === element.id"
              :id="element.id"
              :name="element.name"
              @copy="copy"
              @clear="clear"
              style="transform: translateX(-50%) translateY(-10px);"
            />
          </Transition>
          <component
            :is="renderComponentCode(element)"
            :data="element.formData"
            :viewport="editorStore.viewport"
            :parent="parent"
          />
        </div>
      </div>
    </template>
  </Draggable>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';

import { useEditorStore } from '@/stores/editor';
import { findNodeById, move, nestedClass, replaceNodeId } from './nested';
import { COMPONENT_PREFIX } from '@/config/index';
import type { IBaseBlock } from '@/types/editor';

import EditorRenderCanvas from "./EditorRenderCanvas.vue"

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
  },
  parent: {
    type: String,
    default: ''
  }
});

const hoverId = ref('');

const editorStore = useEditorStore();

// 渲染的组件名称
const renderComponentCode = computed(() => {
  return (element: { code: string }) => {
    return COMPONENT_PREFIX + '-' + element.code;
  };
});

// 激活选中组件的样式
const activeClass = computed(() => {
  return (element: { id: string }) => {
    // 获取状态管理存储的当前的组件id
    const currentId = editorStore.currentSelect?.id;
    return { 'is-active': element.id === currentId };
  };
});

const handleNodeById = (
  arr: IBaseBlock[],
  nodeId: string,
  type: 'copy' | 'clear'
) => {
  return findNodeById(
    arr,
    nodeId,
    (params: { array: IBaseBlock[]; node: IBaseBlock; index: number }) => {
      const { array, node, index } = params;
      if (type === 'copy') array.splice(index, 0, replaceNodeId(node));
      if (type === 'clear') array.splice(index, 1);
    }
  );
};
const copy = (id: string) => {
  if (!editorStore.blockConfig.length) return;
  const newBlockConfig = handleNodeById(editorStore.blockConfig, id, 'copy');
  editorStore.setCurrentSelect(null);
  editorStore.setBlockConfig(newBlockConfig);
};
const clear = (id: string) => {
  if (!editorStore.blockConfig.length) return;
  const newBlockConfig = handleNodeById(editorStore.blockConfig, id, 'clear');
  editorStore.setCurrentSelect(null);
  editorStore.setBlockConfig(newBlockConfig);
};
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
    // background: var(--color-edit-render-block-bg);
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
