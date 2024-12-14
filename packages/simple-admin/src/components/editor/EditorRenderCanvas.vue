<template>
  <div class="editor-render-drag" ref="box">
    <template v-for="(element, index) in list" :key="index">
     <EditorRenderCanvasItem :box="box" :element="element" :parent="parent" />
    </template>
  </div>
</template>
<script lang="ts" setup>
import { ref, type PropType } from "vue";
import type { IBaseBlock } from "@/types/editor";

import EditorRenderCanvasItem from "./EditorRenderCanvasItem.vue";

defineProps({
  list: {
    type: Array as  PropType<IBaseBlock[]>,
    required: true,
    default: () => []
  },
  parent: {
    type: String,
    default: ''
  }
})

const box = ref<HTMLElement | null>(null)
</script>

<style lang="scss" scoped>
.editor-render-drag {
  width: 100%;
  height: 100%;
  .element {
    position: relative;
  }
}
</style>
