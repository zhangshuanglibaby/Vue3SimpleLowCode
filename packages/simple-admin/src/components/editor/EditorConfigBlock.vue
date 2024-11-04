<template>
  <div class="editor-config-block">
    <EditorConfigRender :list="list" @callback="callback">
      <div v-if="!currentSelect">
        <el-empty description="请在左侧拖入组件后，点击选中组件">
          <template #image>
            <VIcon icon="dragBlank" class="icon"></VIcon>
          </template>
        </el-empty>
      </div>
    </EditorConfigRender>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useEditorStore } from '@/stores/editor';
import { all } from 'deepmerge';
import { blockSchema, type BlockSchemaKeys } from '@/config/schema';
import { type IBaseBlock } from '@/types/editor';
import { findNodeById } from '@/components/editor/nested';

import EditorConfigRender from './EditorConfigRender.vue';

const editorStore = useEditorStore();
const currentSelect = computed(() => editorStore.currentSelect);

const list = ref<IBaseBlock[]>([]);

watch(
  () => editorStore.currentSelect,
  value => {
    console.log(value, '====>currentSelect');
    const code = value?.code as BlockSchemaKeys;
    console.log(blockSchema[code], '====blockSchema[code]');
    // 给每个desktop, mobile的值 都绑上id和 formData
    const properties = blockSchema[code].properties;
    if (!value || !properties) {
      list.value = [];
      return;
    }
    console.log(properties);
    console.log(Object.values(properties));
    console.log(Object.entries(properties));
    const { id, formData } = value;

    // 这是在父级绑定id和formData
    const listResult = Object.fromEntries(
      Object.entries(properties).map(itemChild => {
        const [key, value] = itemChild;
        return [key, { ...value, id, key, formData: formData[key] || {} }];
      })
    );
    console.log(listResult, '====>listResult');
    // 这是在子级绑定id和formData
    // list.value = Object.values(properties).map((item, index) => {
    //   const { id, formData } = value;
    //   console.log(Object.entries(item.properties));
    //   return Object.fromEntries(
    //     Object.entries(item.properties).map(
    //       ([key, value]: [string, object]) => {
    //         return [key, { ...value, id, formData: formData[key] || {}, key }];
    //       }
    //     )
    //   );
    // });
    list.value = [...Object.values(listResult)];
  },
  {
    immediate: true,
    deep: true
  }
);

/**
 *
 * 监听右侧组配置区的更改操作，需要更新在状态管理存储的配置区数据
 */
const callback = (params: { data: object; id: string }) => {
  console.log('监听了更改图片值3');
  console.log(params, '======>EditorConfigBlock callback');
  const { data, id } = params;
  if (!id) return;
  const blockConfig = editorStore.blockConfig || [];
  // 遍历状态管理存储的配置区数据， 在找对匹配的元素 更改对应的数据
  const newBLockConfig = findNodeById(blockConfig, id, data);
  editorStore.setBlockConfig(newBLockConfig);
  console.log('配置区的值4', editorStore.blockConfig);
  // 更新下当前激活的组件配置
  if (editorStore.currentSelect?.id === id) {
    const currentSelect = editorStore.currentSelect;
    currentSelect.formData = all([editorStore.currentSelect.formData, data]);
    editorStore.setCurrentSelect(currentSelect);
  }
  console.log(editorStore.currentSelect, '=====>editorStore.currentSelect');
};
</script>
<style lang="scss" scoped>
.editor-config-block {
  width: 100%;
}
</style>
