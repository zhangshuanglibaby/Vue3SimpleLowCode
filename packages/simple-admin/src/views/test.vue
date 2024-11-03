<template>
  <div class="test">
    <div class="container">
      <div class="list">
        <Draggable
          :list="list1"
          :group="{ name: 'list', pull: 'clone', put: false }"
          :sort="false"
          :animation="200"
          item-key="id"
          drag-class="drag"
          class="editor-block-drag"
        >
          <template #item="{ element }">
            <div class="block-item">
              {{ element.value }}
            </div>
          </template>
        </Draggable>
      </div>
      <div class="list list2">
        <test2 />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import test2 from './test2.vue';

const list1 = ref([
  {
    id: 1,
    value: 1
  },
  {
    id: 2,
    value: 2
  },
  {
    id: 3,
    value: 3
  },
  {
    id: 4,
    value: 4
  },
  {
    id: 5,
    value: 5
  }
]);
// const list2 = ref([]);
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
}
.editor-block-drag {
  width: 100%;
  height: 100%;
}
</style>
