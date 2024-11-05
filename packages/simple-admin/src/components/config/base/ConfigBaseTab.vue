<template>
  <div class="config-base-tab">
    <div class="container">
      <div class="list">
        <div
          v-for="(item, index) in data"
          :key="index"
          class="item"
          :class="{ 'is-active': select === item.value }"
          @click="tabClick(item)"
        >
          <slot :item="item" :index="index"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps({
  data: {
    type: Array as () => Array<any>,
    default: () => []
  }
});
const emit = defineEmits(['change']);
const select = ref(props.data.find(item => item.default)?.value || '');

const tabClick = (item: any) => {
  select.value = item.value;
  emit('change', item.value);
};
</script>
<style lang="scss" scoped>
.config-base-tab {
  .container {
    background: var(--color-config-block-bg);
    padding: 4px 8px;
    border-radius: 6px;
    .list {
      display: flex;
    }
    .item {
      // padding: 4px;
      border-radius: 6px;
      margin: 0 4px;
      &.is-active {
        background-color: #fff;
      }
    }
  }
}
</style>
