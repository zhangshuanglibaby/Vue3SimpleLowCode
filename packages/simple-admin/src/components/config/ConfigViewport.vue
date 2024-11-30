<template>
  <div class="config-viewport">
    <el-form-item :label="title">
      <ConfigBaseTab :data="list" @change="change">
        <template #default="{ item }">
          <VIconTooltip
            :icon="item.icon"
            :content="item.content"
            class="icon"
          />
        </template>
      </ConfigBaseTab>
    </el-form-item>
  </div>
</template>
<script setup lang="ts">
import { toRefs, ref, watch } from 'vue';

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
const { formData, key, id } = data.value;
const { title, default: defaultValue } = data.value.properties[props.viewport];

interface ViewportList {
  icon: string;
  content: string;
  value: 'all' | 'mobile' | 'desktop';
  default: boolean;
}

const list = ref<ViewportList[]>([
  {
    icon: 'allViewport',
    content: '多端显示',
    value: 'all',
    default: false
  },
  {
    icon: 'desktop',
    content: '仅桌面端显示',
    value: 'desktop',
    default: false
  },
  {
    icon: 'mobile',
    content: '仅移动端显示',
    value: 'mobile',
    default: false
  }
]);

const callback = (value: { desktop: boolean; mobile: boolean }) => {
  emit('callback', {
    data: {
      [key]: value
    },
    id
  });
};

const change = (value: ViewportList['value']) => {
  const rules = {
    all: { desktop: true, mobile: true },
    desktop: { desktop: true, mobile: false },
    mobile: { desktop: false, mobile: true }
  };
  callback(rules[value]);
};

watch(
  () => formData,
  value => {
    // 这里有点疑问
    const _formData = value?.[key];
    const defaultValueIndex = Math.max(
      list.value.findIndex(v => v.value === _formData || defaultValue),
      0
    );
    list.value[defaultValueIndex].default = true;
    change(list.value[defaultValueIndex].value);
    emit("update", {
      [key]: list.value[defaultValueIndex].value
    })
  },
  {
    immediate: true
  }
);
</script>

<style lang="scss" scoped>
.config-viewport {
  :deep(.el-form-item) {
    align-items: center;
  }
  .icon {
    :deep(.image-box) {
      width: 30px;
      height: 30px;
    }
  }
}
</style>
