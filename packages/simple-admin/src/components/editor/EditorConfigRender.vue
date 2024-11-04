<template>
  <div class="editor-config-render">
    <el-form label-width="auto">
      <div v-for="(item, index) in list" :key="index">
        <component
          v-if="getComponent(item)"
          :is="getComponent(item)"
          :data="item"
          :viewport="editorStore.viewport"
          @callback="callback"
        ></component>
      </div>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { useEditorStore } from '@/stores/editor';
import { batchDynamicComponents } from '@/utils/index';

defineProps({
  list: {
    type: Array,
    default: () => []
  }
});
const emit = defineEmits(['callback']);

const editorStore = useEditorStore();

// 渲染的组件名
const getComponent = (item: any) => {
  const code = item.properties[editorStore.viewport].code;
  // 注意 因为组件没有全局注册，因此需要采用动态组件加载的方法
  return batchDynamicComponents(
    code,
    import.meta.glob('@/components/config/**/*.vue')
  );
};

const callback = (data: any) => {
  emit('callback', data);
};
</script>
<style lang="scss" scoped>
.editor-config-render {
  padding: 0 14px;
}
</style>
