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
    <el-dialog
      v-model="dialogFormVisible"
      title="页面发布"
      width="500"
    >
      <el-form ref="ruleFormRef" :rules="rules" :model="form">
        <el-form-item label="页面名" label-width="83px" prop="name">
          <el-input v-model="form.name" autocomplete="off" placeholder="请输入页面名"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="create(ruleFormRef)">
            提交
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, reactive } from 'vue';
import Ajv from "ajv";
import AjvErrors from "ajv-errors";
import { useEditorStore } from '@/stores/editor';
import { ElMessage } from "element-plus";
import type { FormInstance } from "element-plus";
import { useRouter } from "vue-router";

import type { Viewport } from '@/types/editor';
import icon from '@/config/icon';
import { blockSchema, type BlockSchemaKeys} from "@/config/schema";
import { findNodeById } from "./nested";
import { createPageAsync } from "@/api/page";

const ajv = new Ajv({ allErrors: true })
ajv.addKeyword({
  keyword: ['placeholder', 'rules', 'code', 'inCanvas']
})
AjvErrors(ajv);
const viewport = ref<Viewport>('desktop');

const editorStore = useEditorStore();
const router = useRouter();

const dialogFormVisible = ref(false);
const ruleFormRef = ref<FormInstance>();
const form = reactive({
  name: ''
})
const rules = reactive({
  name: [
    { required: true, message: '请输入页面名', trigger: 'blur' }
  ]
})

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
      // await nextTick();
      // editorStore.setViewport(pathViewport as Viewport);
      // editorStore.setConfigPanelShow(true);
      // findNodeById(editorStore.blockConfig, id, (params) => {
      //   const { node } = params;
      //   editorStore.setCurrentSelect(node)
      // })

      setTimeout(() => {
        editorStore.setViewport(pathViewport as Viewport);
      }, 0)
    }
    editorStore.setConfigPanelShow(true);
    findNodeById(editorStore.blockConfig, id, (params) => {
      const { node } = params;
      editorStore.setCurrentSelect(node)
    })
    console.warn('ajv error', id, validate.errors?.[0]?.instancePath, validate.errors?.[0]?.message)
    return true;
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
  const hasError =  list.some((item) => validateAll(item))
  if(hasError) return;
  dialogFormVisible.value = true;
}

const create = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if(!valid) {
      console.log("error submit!", fields)
      return;
    }

    await createPageAsync({
      name: form.name,
      content: JSON.stringify({ block: editorStore.blockConfig, page: editorStore.pageConfig })
    })
    dialogFormVisible.value = false;
    ElMessage.success('发布成功');
    router.go(-1);
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
