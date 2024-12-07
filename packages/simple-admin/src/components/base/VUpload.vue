<template>
  <el-upload
    :file-list="model"
    :list-type="listType"
    :http-request="handleFileUpload"
    :on-remove="handleRemove"
    :on-change="handleChange"
    style="width: 100%"
    :class="{ 'is-hidden': model.length }"
  >
    <template #trigger>
      <el-button v-if="isVideo" type="primary" plain>上传视频</el-button>
      <v-icon v-else icon="upload" class="icon"></v-icon>
    </template>
  </el-upload>
</template>
<script setup lang="ts">
import {  computed } from 'vue';
// import { useFormItem } from "element-plus";
// const { formItem } = useFormItem();
import { mediaUploadAsync } from "@/api/upload"

const props = defineProps({
  type: {
    type: String,
    default: 'image',
    validator (val: string) {
      return ['image', 'video'].includes(val);
    }
  }
});

const model = defineModel({ type: Array, default: () => [] })
const isVideo = computed(() => props.type === 'video');
const listType = computed(() => isVideo.value ? 'text' : 'picture-card');


const handleFileUpload = async (e: any) => {
  console.log(e, "====>e")
  const formData = new FormData();
  formData.append('file', e.file)
  const url = await mediaUploadAsync(formData)
  model.value = [{
    name: 'file',
    url
  }];
}

const handleChange = (uploadFile:any, uploadFiles:any) => {
  console.log(uploadFile, uploadFiles)
}

const handleRemove = () => {
  model.value = [];
}
</script>
<style lang="scss" scoped>
.is-error {
.file,
.image {
  box-shadow: 0 0 0 1px var(--el-color-danger) inset;
}
:deep(.el-upload--picture-card) {
  border: 1px dashed var(--el-color-danger);
}
}
.icon {
  width: 26px;
  height: 26px;
}
.is-hidden {
  :deep(.el-upload--picture-card) {
    display: none;
  }
}
</style>
