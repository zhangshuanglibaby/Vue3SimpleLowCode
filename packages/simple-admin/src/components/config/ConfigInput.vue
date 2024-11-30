<template>
  <div class="config-input">
    <el-form-item :label="title" :prop="key + '.' + viewport">
      <el-input v-model="input" :placeholder="placeholder" class="input" />
    </el-form-item>
  </div>
</template>
<script setup lang="ts">
import { ref, toRefs, watch } from 'vue';

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
const { formData, id, key } = data.value;
const {
  title,
  default: defaultValue,
  placeholder
} = data.value.properties[props.viewport];
const input = ref('');

/**
 * 监听在渲染区点击其他组件时，监听formData数据 赋值
 */
watch(
  () => formData,
  value => {
    input.value = value?.[props.viewport] || defaultValue;
  },
  {
    immediate: true
  }
);
watch(input, value => {
  let data = {};
  const _value = value || '';
  // 这里的formData 有点混乱
  // formData里面默认的初始化是{},因此下面的代码是 如果一开始没有两端的数据，则两端的值先默认取一致
  if (Object.values(formData).length < 2) {
    data = { desktop: _value, mobile: _value };
  } else {
    // data = { [props.viewport]: _value };
    /**
     * 这里是我自己改的，总觉得应该是新旧数据合并
     */
    data = { [props.viewport]: _value };
  }
  emit('callback', {
    data: {
      [key]: data
    },
    id
  });
  emit("update", {
    [key]: data
  })
},
{
  immediate: true
});
</script>
<style lang="scss" scoped>
.config-input {
  :deep(.el-input__wrapper) {
    background: var(--color-config-block-bg);
  }
}
</style>
