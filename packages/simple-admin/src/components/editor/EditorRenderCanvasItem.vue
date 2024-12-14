<template>
  <div ref="containerRef" class="element" :style="[elementStyle]">
    <div
      class="block-render"
      :class="activeClass(element)"
      @click.stop="!isDraggingTemp && editorStore.setCurrentSelect({...element, parent})"
      @mouseup="resetDragging"
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
<script lang="ts" setup>
import { computed, ref, watch, type PropType } from 'vue';
import { useDraggable } from "@vueuse/core";
import { cloneDeep, debounce } from "lodash"

import { useEditorStore } from '@/stores/editor';
import { findNodeById,  replaceNodeId } from './nested';
import { COMPONENT_PREFIX } from '@/config/index';
import type { IBaseBlock } from '@/types/editor';
import { sleep } from "@/utils";

const props = defineProps({
  element: {
    type: Object as PropType<IBaseBlock>,
    required: true,
    default: () => {}
  },
  parent: {
    type: String,
    default: ''
  },
  box: {
    type: Object as PropType<HTMLElement>,
    default: null
  }
})

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

const containerRef = ref<HTMLElement | null>()
const isDisabled = computed(() => editorStore.currentSelect?.id !== props.element.id)
const isDraggingTemp = ref(false)
// 不能使用useDraggable的isDragging,否则Click 放手一瞬间isDragging也会变为false
// isDragging 当前是否拖拽状态
const { x, y, style, isDragging } = useDraggable(containerRef, {
  stopPropagation: true,
  initialValue: { x: 0, y: 0 },
  containerElement: props.box,
  disabled: isDisabled
})

watch(isDragging, (val) => {
  if(!val) isDraggingTemp.value = true
})
const resetDragging = async () => {
  await sleep(500);
  isDraggingTemp.value = false;
}

const isSynced = ref(false);

watch(
  style,
  debounce(() => {
    if(!editorStore.currentSelect?.id || editorStore.currentSelect?.id !== props.element.id) {
      return;
    }
    const newBlockConfig = findNodeById(editorStore.blockConfig, editorStore.currentSelect?.id, (params) => {
      const {  array, node, index } = params;
      const newNode = cloneDeep(node);
      if(newNode.formData && editorStore.currentSelect?.formData) {
        newNode.formData.top[editorStore.viewport] = y.value + 'px'
        newNode.formData.left[editorStore.viewport] = x.value + 'px'
      }
      array[index] = newNode
      editorStore.setCurrentSelect(newNode);
      isSynced.value = true
    });
    editorStore.setBlockConfig(newBlockConfig)
  }, 300)
)

watch(
  () => props.element,
  (element) => {
    if(isSynced.value) {
      isSynced.value = false;
      return;
    }
    if(!element?.formData?.top?.[editorStore.viewport]) return;
    if(!element?.formData?.left?.[editorStore.viewport]) return;
    y.value = element?.formData?.top?.[editorStore.viewport]?.replace('px', '');
    x.value = element?.formData?.left?.[editorStore.viewport]?.replace('px', '');
  }
)

watch(
  () => editorStore.viewport,
  () => {
    if(!props.element?.formData?.top?.[editorStore.viewport]) return;
    if(!props.element?.formData?.left?.[editorStore.viewport]) return;
    y.value = props.element?.formData?.top?.[editorStore.viewport]?.replace('px', '');
    x.value = props.element?.formData?.left?.[editorStore.viewport]?.replace('px', '');
  }
)


const elementStyle = computed(() => {
  return [
    {
      width: 'fit-content',
      position: 'absolute',
      'z-index': '999',
      transform: `translate3d(${x.value}px, ${y.value}px, 0)`
    }
  ]
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
</style>
