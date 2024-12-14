<template>
  <div class="editor-config-render">
    <el-form label-width="auto" ref="ruleFormRef" :model="form" :rules="rules">
      <!-- <div v-for="(item, index) in list" :key="index">
        <component
          v-if="getComponent(item)"
          :is="getComponent(item)"
          :data="item"
          :viewport="editorStore.viewport"
          @callback="callback"
          @update="update"
        ></component>
      </div> -->
      <transition-group name="fade">
        <div v-for="(item, index) in list" :key="index">
          <component
          v-if="
          (!itemCanvas(item) && getComponent(item)) ||
          (itemCanvas(item) && inCanvas && getComponent(item))"
          :is="getComponent(item)"
          :data="item"
          :viewport="editorStore.viewport"
          @callback="callback"
          @update="update"></component>
        </div>
      </transition-group>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useEditorStore } from '@/stores/editor';
import { batchDynamicComponents } from '@/utils/index';

 const props = defineProps({
  list: {
    type: Array,
    default: () => []
  },
  schema: {
    type: Object,
    default: () => {}
  }
});
const emit = defineEmits(['callback']);

const editorStore = useEditorStore();

const ruleFormRef = ref();
const form = ref<any>({});

const inCanvas = computed(() => editorStore.currentSelect?.parent === 'canvas')
const itemCanvas = (item: any) => {
  return item.properties?.[editorStore.viewport]?.inCanvas
}

const transfer = (b: any, key='default'): any => {
  if(!b) return []
  return Object.fromEntries(
    Object.entries(b.properties).map((item: any) => {
      const [keyP, valueP] = item
      if(valueP.properties) return [keyP, transfer(valueP, key)]
      return [keyP, valueP[key]]
    })
  )
}
const rules = ref(transfer(props.schema, 'rules'));
console.log(rules.value, "======>rules");
const update = (params: any) => {
  const list = Object.entries(params || {})
  list.forEach(([key, value]) => {
    form.value[key] = value
  })
  console.log(form.value, "=====>form");
}

const submitForm = () => {
  setTimeout(() => {
    if(!ruleFormRef.value) return;
    ruleFormRef.value.validate((valid: any, fields: any) => {
      console.log(valid, fields)
    })
  }, 200)
}
submitForm();
watch(
  () => props.list,
  () => {
    submitForm()
  }
)

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
  overflow-y: auto;
  width: 100%;
  :deep(.el-form) {
    padding-left: 14px;
    padding-right: 14px;
    padding-bottom: 14px;
  }
  :deep(.el-form-item__label) {
    justify-content: flex-start;
  }
}
</style>
