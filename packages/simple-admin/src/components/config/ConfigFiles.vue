<template>
  <div class="config-files">
    <el-form-item :label="title">
      <img v-if="src" :src="src" class="image" @click="fileClick" />
      <div v-else class="file" @click="fileClick">
        <v-icon icon="upload" class="icon"></v-icon>
      </div>
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

const emit = defineEmits(['callback']);
const { data } = toRefs(props);
console.log(data.value, '======>data.value');
const { formData, id, key } = data.value;
const { title, default: defaultValue } = data.value.properties[props.viewport];
const src = ref('');

/**
 * 监听在渲染区点击其他组件时，监听formData数据 赋值
 */
watch(
  () => formData,
  value => {
    console.log('=======>formData', value);
    src.value = value?.[props.viewport] || defaultValue;
  },
  {
    immediate: true,
    deep: true
  }
);
watch(src, value => {
  let data = {};
  const _value = value || '';
  // 这里的formData 有点混乱
  // formData里面默认的初始化是{},因此下面的代码是 如果一开始没有两端的数据，则两端的值先默认取一致
  if (Object.values(formData || {}).length < 2) {
    data = { desktop: _value, mobile: _value };
  } else {
    // data = { [props.viewport]: _value };
    /**
     * 这里是我自己改的，总觉得应该是新旧数据合并
     */
    data = { [props.viewport]: _value };
  }
  console.log('发射了了更改图片2');
  emit('callback', {
    data: {
      [key]: data
    },
    id
  });
});

const fileClick = () => {
  const list = [
    'https://images.unsplash.com/photo-1730283207724-12fb6efc4890?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1730248202596-fbdef5624120?q=80&w=2800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1711619034401-6eb679e5203c?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1729836599373-9517a778b798?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  ];
  const randomIndex = Math.floor(Math.random() * list.length);
  src.value = list[randomIndex];
  console.log('点击了更改图片1');
};
</script>
<style lang="scss" scoped>
.config-files {
  .image,
  .file {
    width: 80px;
    height: 80px;
    border: 1px dashed var(--color-border);
    border-radius: 4px;
    background: var(--color-config-block-bg);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .image {
    border: 0;
    width: 82px;
    height: 82px;
    object-fit: cover;
  }
  .icon {
    width: 26px;
    height: 26px;
  }
}
</style>
