<template>
  <div class="editor-block">
    <div class="left">
      <div
        v-for="(item, index) in menuList"
        :key="index"
        class="menu-item"
        :class="{ 'is-active': index === activeMenu }"
        @click="activeMenu = index"
      >
        <VIcon
          :icon="index === activeMenu ? item.iconActive : item.icon"
          class="menu-icon"
        />
        <div class="menu-name">{{ item.name }}</div>
      </div>
    </div>
    <div class="right">
      <el-collapse v-model="activeNames" v-show="activeMenu === 0">
        <el-collapse-item name="1" v-show="!isCanvasCurrentSelect">
          <template #title>
            <span class="collapse-title">基础组件</span>
          </template>
          <EditorBlockDrag
            :list="baseBlockList"
            :sort="false"
            :group="{ name: dragGroup, pull: 'clone', put: false }"
          />
        </el-collapse-item>
        <el-collapse-item name="2" v-show="!isCanvasCurrentSelect">
          <template #title>
            <span class="collapse-title">高级组件</span>
          </template>
          <EditorBlockDrag
            :list="seniorBlockList"
            :sort="false"
            :group="{ name: dragGroup, pull: 'clone', put: false }"
          />
        </el-collapse-item>
        <el-collapse-item name="3" v-show="isCanvasCurrentSelect">
          <template #title>
            <span class="collapse-title">画布组件</span>
          </template>
          <EditorBlockCanvas :list="canvasBlockList" />
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { baseBlocks, seniorBlocks, canvasBlocks } from '@/config/block';
import { dragGroup } from './nested';
import { useEditorStore } from "@/stores/editor";

import EditorBlockCanvas from "./EditorBlockCanvas.vue";

const editorStore = useEditorStore();

const menuList = ref([
  {
    icon: 'block',
    iconActive: 'blockActive',
    name: '组件'
  },
  {
    icon: 'kit',
    iconActive: 'kitActive',
    name: '套件'
  }
]);

const activeMenu = ref(0);
const activeNames = ref(['1', '2', '3']);
const baseBlockList = ref(baseBlocks);
const seniorBlockList = ref(seniorBlocks);
const canvasBlockList = ref(canvasBlocks);

const isCanvasCurrentSelect = computed(() => editorStore.currentSelect?.code === 'canvas')
</script>
<style lang="scss" scoped>
.editor-block {
  display: flex;
  width: var(--editor-block-width);
  position: fixed;
  left: 0;
  top: var(--editor-header-height);
  bottom: 0;
  justify-content: flex-start;
  background-color: white;
  .left {
    width: 70px;
    flex-shrink: 0;
    border-right: 1px solid var(--color-border);
    padding: 16px 6px;
    box-sizing: border-box;
    .menu-item {
      // width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 6px;
      box-sizing: border-box;
      border-radius: 8px;
      transition: all 0.2s linear;
      cursor: pointer;
      &:not(:last-child) {
        margin-bottom: 12px;
      }
      &.is-active {
        background: var(--color-black-hover);
      }
    }
    .menu-icon {
      font-size: 28px;
    }
    .menu-name {
      font-size: 14px;
    }
  }
  .right {
    flex: 1;
    border-right: 1px solid var(--color-border);
    .collapse-title {
      font-size: 16px;
      padding-left: 16px;
    }
  }
}
</style>
