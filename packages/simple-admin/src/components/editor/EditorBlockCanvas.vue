<template>
  <div class="editor-block-drag">
    <div
      v-for="(element, index) in list"
      :key="index"
     class="block-item"
     @click="handleClick(element)">
      <VIcon :icon="element.icon" class="block-i"></VIcon>
      <div class="block-name" v-html="element.name"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { PropType } from "vue";
import { useEditorStore } from "@/stores/editor"

import type { IBaseBlock } from "@/types/editor";
import { clone, findNodeById } from "./nested";
import { cloneDeep } from "lodash";

defineProps({
  list: {
    type: Array as PropType<IBaseBlock[]>,
    required: true,
    default: () => []
  }
})

const editorStore = useEditorStore()

const handleClick = (element: IBaseBlock) => {
  console.log(element, "====>element")
  console.log(editorStore.currentSelect, "====>editorStore.currentSelect")
  if(!editorStore.currentSelect) return
  const newBlockConfig = findNodeById(editorStore.blockConfig, editorStore.currentSelect.id, (params) => {
    const { array, node, index } = params;
    const newNode = cloneDeep(node);
    console.log(newNode, "======>newNode")
    newNode.children[0].push(clone(element))
    array[index] = newNode
    editorStore.setCurrentSelect(newNode)
  })
  editorStore.setBlockConfig(newBlockConfig)
}

</script>
<style lang="scss" scoped>
.editor-block-drag {
  display: flex;
  flex-wrap: wrap;
  .block-item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 33.33%;
    font-size: 14px;
    box-sizing: border-box;
    padding: 8px 0;
    border-radius: 8px;
    cursor: grab;
    &:hover {
      background: var(--color-black-hover);
      outline: 1px solid var(--color-border);
    }
    &:active {
      cursor: grabbing;
    }
  }
  .block-icon {
    font-size: 24px;
  }
}
</style>
