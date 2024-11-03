<template>
  <div class="editor-header">
    <div class="header-left">
      <div class="back">
        <Icon :icon="icon.back" />
      </div>
      <div class="header-title">页面</div>
      <div class="line"></div>
      <VSelect v-model="viewport"></VSelect>
    </div>
    <div class="header-right">
      <el-button>
        <Icon :icon="icon.preview" />
        预览
      </el-button>
      <el-button type="primary">
        <Icon :icon="icon.publish" />
        发布
      </el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import type { Viewport } from '@/types/editor';
import icon from '@/config/icon';

const viewport = ref<Viewport>('desktop');
</script>
<style lang="scss" scoped>
.editor-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 500;
  height: var(--editor-header-height);
  background-color: white;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  .header-left {
    display: flex;
    align-items: center;
    .back {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 5px;
      cursor: pointer;
      border-radius: var(--border-radius);
      &:hover {
        background-color: var(--color-black-hover);
      }
    }
    .header-title {
      margin-left: 16px;
    }
    .line {
      width: 1px;
      background: var(--color-border);
      height: 20px;
      margin: 0 16px;
    }
  }
}
</style>
