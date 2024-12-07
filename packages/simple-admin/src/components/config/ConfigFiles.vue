<template>
  <div class="config-files">
    <el-form-item :label="title" :prop="key + '.' + viewport">
      <!-- <img v-if="src" :src="src" class="image" @click="fileClick" />
      <div v-else class="file" @click="fileClick">
        <v-icon icon="upload" class="icon"></v-icon>
      </div> -->
      <el-upload
        class="avatar-uploader"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :show-file-list="false"
        :http-request="httpRequest"
      >
        <img v-if="src" :src="src" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
      <el-input v-model="src" style="display: none;"></el-input>
    </el-form-item>
  </div>
</template>
<script setup lang="ts">
import { ref, toRefs, watch } from 'vue';
// import { useFormItem } from "element-plus";
// const { formItem } = useFormItem();
import { mediaUploadAsync } from "@/api/upload"

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

const emit = defineEmits(['callback', 'update']);
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
  // formItem?.validate('change').catch(err:any) => console.warn(err))

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
  emit('callback', {
    data: {
      [key]: data
    },
    id
  });
  emit("update", {
    [key]: data
  })
},
{
  immediate: true
});

// const fileClick = () => {
//   const list = [
//     'https://inews.gtimg.com/om_bt/O2inS9Nb3e5INdJojYXRewcLXz2QWLv-amhBF5DooxMDwAA/641',
//     'https://inews.gtimg.com/om_bt/OQi1JP5qEZ0D9gCVsRe4W6KQRggJGw4xdVNC2ShSgzKrgAA/641',
//     'https://inews.gtimg.com/om_bt/OAVMydtx9BsJxf5i_thi4Oll9sR1px-Esmtv6UHSxoisEAA/641',
//     'https://inews.gtimg.com/om_bt/OTOK89rgS04YCICQqXqlbEpF56JbsSme41LosbgK5LrQMAA/641'
//   ];
//   const randomIndex = Math.floor(Math.random() * list.length);
//   src.value = list[randomIndex];
//   console.log('点击了更改图片1');
// };

const httpRequest = async (e: any) => {
  console.log(e, "====>e")
  const formData = new FormData();
  formData.append('file', e.file)
  const url = await mediaUploadAsync(formData)
  src.value = url;
}
</script>
<style lang="scss" scoped>
.config-files {
  .image,
  .file {
    width: 80px;
    height: 80px;
    border: 1px dashed var(--color-border);
    box-shadow: 0 0 0 1px var(--color-border) inset;
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
  .is-error {
    .file,
    .image {
      box-shadow: 0 0 0 1px var(--el-color-danger) inset;
    }
  }
  .icon {
    width: 26px;
    height: 26px;
  }
  :deep(.avatar-uploader .el-upload) {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }

  :deep(.avatar-uploader .el-upload:hover ){
    border-color: var(--el-color-primary);
  }
  :deep(.avatar) {
    width: 178px;
    height: 178px;
  }
  :deep(.el-icon.avatar-uploader-icon) {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }
}
</style>
