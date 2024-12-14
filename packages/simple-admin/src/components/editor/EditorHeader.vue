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
      <el-button type="primary" @click="submit">
        <Icon :icon="icon.publish" />
        发布
      </el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';
import Ajv from "ajv";
import AjvErrors from "ajv-errors";
import { useEditorStore } from '@/stores/editor';

import type { Viewport } from '@/types/editor';
import icon from '@/config/icon';
import { blockSchema, type BlockSchemaKeys} from "@/config/schema";
import { findNodeById } from "./nested";

const ajv = new Ajv({ allErrors: true })
ajv.addKeyword({
  keyword: ['placeholder', 'rules', 'code', 'inCanvas']
})
AjvErrors(ajv);
const viewport = ref<Viewport>('desktop');

const editorStore = useEditorStore();

watch(viewport, val => {
  editorStore.setViewport(val);
  // 如果是移动端的 则默认是展开右侧的配置区
  editorStore.setConfigPanelShow(val === 'mobile');
  editorStore.setCurrentSelect(null);
});

const validateAll = async(item: any) => {
  const { value, schema, id } = item;
  const validate = ajv.compile(schema);
  const valid = validate(value);
  if(!valid) {
    const path = validate.errors?.[0]?.instancePath;
    if(path) {
      const [, , pathViewport] = path.split("/");
      viewport.value = pathViewport as Viewport;
      await nextTick();
      editorStore.setViewport(pathViewport as Viewport);
      editorStore.setConfigPanelShow(true);
      findNodeById(editorStore.blockConfig, id, (params) => {
        const { node } = params;
        editorStore.setCurrentSelect(node)
      })
    }
    console.warn('ajv error', id, validate.errors?.[0]?.instancePath, validate.errors?.[0]?.message)
  }
  console.warn('ajv submit')
}

const submit = () => {
  const list = editorStore.blockConfig.map((item) => {
    return {
      id: item.id,
      value: item.formData,
      schema: blockSchema[item.code as BlockSchemaKeys]
    }
  })
  list.forEach((item) => {
    validateAll(item)
  })
}
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
