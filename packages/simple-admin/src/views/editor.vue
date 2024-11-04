<template>
  <div class="editor">
    <EditorHeader />
    <div class="container" :class="classes">
      <EditorBlock />
      <EditorRender />
      <EditorConfig />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useEditorStore } from '@/stores/editor';

const editorStore = useEditorStore();
const classes = computed(() => {
  return { 'mobile-background': editorStore.isMobileViewport };
});
</script>
<style lang="scss" scoped>
.editor {
  width: 100%;
  overflow-x: hidden;
  user-select: none;
  --editor-header-height: 64px;
  --editor-block-width: 300px;
  --border-radius: 4px;
  .container {
    display: flex;
    width: 100%;
    min-width: 100%;
    &.mobile-background {
      background: var(--color-bg);
    }
  }
}
</style>
