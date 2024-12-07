<template>
  <div class="config-text">
    <el-form-item :label="title" :prop="key + '.' + viewport">
      <el-button plain @click="dialogVisible = true"> 设置 </el-button>
    </el-form-item>
    <el-dialog
      v-model="dialogVisible"
      title="富文本"
      width="600"
      style="min-height: 400px;"
      @opened="openedDilaog"
    >
      <span>
        <QuillEditor ref="richRef" @text-change="textChange" @blur="textChange" theme="snow" toolbar="essential" style="height: 300px;overflow-y: auto;"/>
      </span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, toRefs, watch, nextTick } from 'vue';

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
const { formData, id, key } = data.value;
const {
  title,
  default: defaultValue
} = data.value.properties[props.viewport];
const input = ref('');

const dialogVisible = ref(false);

const richRef = ref();

const textChange = () => {
  input.value = richRef.value.getHTML()
}

/**
 * 监听在渲染区点击其他组件时，监听formData数据 赋值
 */
watch(
  () => formData,
  value => {
    input.value = value?.[props.viewport] || defaultValue;
  },
  {
    immediate: true
  }
);
watch(input, value => {
  let data = {};
  const _value = value || '';
  // 这里的formData 有点混乱
  // formData里面默认的初始化是{},因此下面的代码是 如果一开始没有两端的数据，则两端的值先默认取一致
  if (Object.values(formData).length < 2) {
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

// 监听弹窗打开
const openedDilaog = () => {
  nextTick(() => {
    richRef.value.setHTML(input.value)
  })
}
</script>
<style lang="scss" scoped>
.config-color {
 position: relative;
}
</style>
