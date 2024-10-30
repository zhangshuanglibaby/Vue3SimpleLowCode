<script setup lang="ts">
defineProps<{
  src: string
}>()
</script>

<template>
  <h1 class="title">标题</h1>
  <img :src="src" class="s-image" />
</template>

<style scoped>
.s-image {
  width: 200px;
  height: 300px;
  margin: 0 auto;
}
</style>
