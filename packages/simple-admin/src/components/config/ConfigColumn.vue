<template>
  <div class="config-column">
    <el-form-item>
      <div class="list">
        <div v-for="(item, index) in column" :key="index" class="item">
          <div v-html="withFormat(item)" class="input"></div>
        </div>
      </div>
      <div class="action-box">
        <div class="item">
          <VIcon
            v-if="isShowRemove"
            icon="subtract"
            class="icon"
            @click="remove"
          />
          <VIcon v-if="isShowAdd" icon="add" class="icon" @click="add" />
        </div>
      </div>
    </el-form-item>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, toRefs, watch } from 'vue';

const props = defineProps({
  data: {
    type: Object,
    default: () => {}
  },
  viewport: {
    type: String,
    default: 'desktop'
  }
});

const emit = defineEmits(['callback', 'update']);

const { data } = toRefs(props);
const { id, key, formData } = data.value;

const {
  default: defaultValue,
  minItems,
  maxItems
} = data.value.properties[props.viewport];
const realDefaultValue = Array.from({ length: minItems }, () => defaultValue);

const column = ref<number[]>([]);
const isShowAdd = computed(() => column.value.length < maxItems);
const isShowRemove = computed(() => column.value.length > minItems);

/**
 * 监听在渲染区点击其他组件时，监听formData数据 赋值
 */
watch(
  () => formData,
  value => {
    column.value = value?.[props.viewport] || realDefaultValue;
  },
  {
    immediate: true
  }
);

watch(column, value => {
  if (value.length > maxItems) return;
  const _value = value;
  const data = { desktop: _value, mobile: _value };

  emit('callback', {
    data: {
      [key]: data
    },
    id
  });
  emit("update", {
    [key]: data
  })
});

// 创建指定长度的数组
const updateNumber = (length: number) =>
  Array.from({ length }, () => 1 / length);
const withFormat = (width: number) =>
  parseInt(String(width * 10000)) / 100 + '%';

const add = () => {
  const { length } = column.value;
  if (length === maxItems) return;
  column.value = updateNumber(length + 1);
};
const remove = () => {
  const { length } = column.value;
  if (length === minItems) return;
  column.value = updateNumber(length - 1);
};
</script>
<style lang="scss" scoped>
.config-column {
  .list {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
  }
  .action-box {
    width: 100%;
    display: flex;
  }
  .item {
    flex: 1;
    flex-shrink: 0;
    background: var(--color-config-block-bg);
    border: 1px dashed var(--color-border);
    // border-right: 0;
    border-radius: 4px;
    text-align: center;
  }
  .icon {
    margin: 0 4px;
    cursor: pointer;
  }
}
</style>
