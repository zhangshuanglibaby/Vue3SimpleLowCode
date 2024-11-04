<template>
  <div
    class="editor-config"
    ref="editorConfigRef"
    :class="{ 'is-show': configPanelShow }"
  >
    <!-- 伸缩图标 -->
    <div class="icon-group">
      <VIconTooltip
        icon="expand"
        :content="configPanelShow ? '收起侧边栏' : '展开侧边栏'"
        @click="panelSwitch"
      />
    </div>
    <div class="content">
      <transition-group name="fade">
        <div class="title" v-if="currentSelect">组件</div>
        <div class="title" v-else>页面</div>
        <EditorConfigBlock v-if="currentSelect" />
        <EditorConfigPage v-else />
      </transition-group>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, watch } from 'vue';
import { useEditorStore } from '@/stores/editor';

import EditorConfigBlock from './EditorConfigBlock.vue';
import EditorConfigPage from './EditorConfigPage.vue';

const editorStore = useEditorStore();
const configPanelShow = computed(() => editorStore.configPanelShow);
const currentSelect = computed(() => editorStore.currentSelect);

// 监听有选中当前的组件。则展开配置区域
watch(
  () => editorStore.currentSelect,
  value => {
    if (value?.id) {
      editorStore.setConfigPanelShow(true);
    }
  }
);
// 如果关闭配置区域，则把currentSelect值清空
watch(
  () => editorStore.currentSelect,
  value => {
    if (!value) editorStore.setCurrentSelect({});
  }
);
// 点击伸缩图标
const panelSwitch = () => {
  editorStore.setConfigPanelShow(!configPanelShow.value);
};
</script>
<style lang="scss" scoped>
.editor-config {
  position: fixed;
  z-index: 200;
  top: var(--editor-header-height);
  right: -280px;
  width: 280px;
  background: white;
  border-left: 1px solid var(--color-border);
  transition: right 0.5s cubic-bezier(1, 0, 0.61, 1.01);
  height: calc(100vh - var(--editor-header-height));
  &.is-show {
    right: 0;
    transition: right 0.5s cubic-bezier(1, 0, 0.61, 1.01);
  }
  .icon-group {
    position: absolute;
    left: -48px;
    top: 16px;
    .icon {
      cursor: pointer;
      width: 32px;
      height: 32px;
      padding: 3px;
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      transition: all 0.2s linear;
      border: 1px solid var(--color-border);
      background: white;
      & + .icon {
        margin-top: 10px;
      }
      &:hover {
        background: var(--color-icon-hover);
        transition: all 0.2s linear;
      }
    }
  }

  .content {
    overflow-y: auto;
    width: 100%;
    height: 100%;
    .title {
      padding: 14px;
      font-size: 20px;
      font-weight: 600;
    }
    :deep(.el-tabs--border-card) {
      border: 0;
    }
    :deep(.el-tabs__content) {
      padding: 0;
    }
  }
}
</style>
