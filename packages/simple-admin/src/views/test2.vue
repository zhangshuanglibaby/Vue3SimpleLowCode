<template>
  <Draggable
    :list="list2"
    :group="{ name: 'list' }"
    :sort="false"
    :animation="200"
    item-key="id"
    ghost-class="ghost-class"
    drag-class="drag"
    class="editor-block-drag"
  >
    <template #item="{ element }">
      <div class="block-item">
        {{ element.value }}
      </div>
    </template>
  </Draggable>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const list2 = ref([]);
</script>
<style lang="scss" scoped>
.test {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.container {
  display: flex;
}
.list {
  width: 100px;
}
.block-item {
  padding: 12px;
  border: 1px solid red;
}
.list2 {
  width: 400px;
  border: 1px solid black;
}
.ghost-class {
  background-color: red !important;
  text-align: center !important;
  height: 40px !important;
}
.editor-block-drag {
  width: 100%;
  height: 100%;
}
</style>
