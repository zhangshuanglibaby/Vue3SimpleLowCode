<template>
  <div class="editor">
    11
    <EditorHeader />
    <div class="container">
      <EditorBlock />
      <EditorRender />
      <EditorConfig />
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.editor {
  .container {
    display: flex;
  }
}
</style>
