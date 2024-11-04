<template>
  <div class="editor-config-page">
    <EditorConfigRender :list="list" @callback="callback"></EditorConfigRender>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useEditorStore } from '@/stores/editor';
import deepmerge from 'deepmerge';
import { pageSchema, type PageSchemaFormData } from '@/config/schema';

import EditorConfigRender from './EditorConfigRender.vue';

const editorStore = useEditorStore();

const properties = pageSchema.properties;
const list = ref<typeof properties[keyof typeof properties][]>([]);
// const formData = editorStore.pageConfig;
const listResult = Object.fromEntries(
  Object.entries(properties).map(itemChild => {
    const [key, value] = itemChild;
    return [key, { ...value, key, formData: editorStore.pageConfig || {} }];
  })
);
list.value = [...Object.values(listResult)];
console.log(list.value, '=====>list.val');
/**
 *
 * 监听右侧组配置区的更改操作，需要更新在状态管理存储的页面配置区数据 和 也要list中对应的数据
 */
const callback = (params: { data: any }) => {
  const { data } = params; // data: {title: {desktop: '1', mobile: '1'}}
  const key = Object.keys(data)[0];
  const formData = editorStore.pageConfig || {};
  editorStore.setPageConfig(
    deepmerge.all([formData, data]) as PageSchemaFormData
  );
  list.value.forEach(item => {
    if (item.key === key) {
      const itemFormData = deepmerge.all([item?.formData || {}, data[key]]);
      item.formData = itemFormData;
      return;
    }
  });
  console.log(list.value, '=====>list.value');
};
</script>
<style lang="scss" scoped>
.editor-config-page {
  width: 100%;
}
</style>
