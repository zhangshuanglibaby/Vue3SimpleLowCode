<template>
  <Draggable
    :list="list"
    :group="group"
    :sort="sort"
    :animation="200"
    item-key="id"
    ghost-class="ghost-class"
    class="editor-block-drag"
    :clone="clone"
    :move="move"
  >
    <template #item="{ element }">
      <div class="block-item">
        <VIcon class="block-icon" :icon="element.icon" />
        <div v-html="element.name" class="block-name"></div>
      </div>
    </template>
  </Draggable>
</template>
<script setup lang="ts">
import { move, clone } from './nested';

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
  }
});
</script>
<style lang="scss" scoped>
.editor-block-drag {
  display: flex;
  padding: 12px;
  flex-wrap: wrap;
  .ghost-class {
    // height: 40px;
    border: 1px solid var(--color-active-text) !important;
    // background-color: rgba(64, 158, 255, 0.3);
    // display: flex;
    // flex-direction: column;
    // align-items: center;
    // justify-content: center;
  }
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
