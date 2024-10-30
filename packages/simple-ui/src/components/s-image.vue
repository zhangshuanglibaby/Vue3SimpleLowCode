<script setup lang="ts">
defineProps<{
  src: string
}>()
</script>

<template>
  <h1 class="title">标题</h1>
  <img :src="src" class="s-image" />
</template>

<style lang="scss" scoped>
.s-image {
  width: 300px;
  height: 200px;
  margin: 0 auto;
}
.title {
  font-size: 50px;
  color: red;
}
@container (max-width: 600px) {
  .title {
    font-size: 20px;
    color: blue;
  }
}
</style>
