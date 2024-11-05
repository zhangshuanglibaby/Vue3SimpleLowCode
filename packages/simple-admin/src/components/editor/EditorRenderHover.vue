<template>
  <div class="editor-render-hover">
    <VIconTooltip icon="drag" :content="'按住拖动' + name" class="item drag" />
    <VIconTooltip icon="copy" content="复制" class="item" @click.stop="copy" />
    <VIconTooltip
      icon="delete"
      content="删除"
      class="item"
      @click.stop="clear"
    />
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  id: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['copy', 'clear']);

const copy = () => {
  emit('copy', props.id);
};

const clear = () => {
  emit('clear', props.id);
};
</script>
<style lang="scss" scoped>
.editor-render-hover {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  background-color: #fff;
  display: flex;
  box-shadow: 0px 0px 7px 5px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  padding: 5px;
  .item {
    :deep(.image-box) {
      width: 32px;
      height: 32px;
    }
  }
}
</style>
