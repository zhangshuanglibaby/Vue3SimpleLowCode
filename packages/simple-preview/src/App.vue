<script setup lang="ts">
import { ref } from 'vue'
import simple from '@simple/ui'

const { SImage } = simple

const width = ref('')

const changeWidth = () => {
  width.value = '500px'
}
</script>

<template>
  <div class="container" :style="{ width: width }">
    <SImage
      src="https://www.finclip.com/news/zb_users/theme/zblog5_news/image/logo.png"
    />
    <button @click="changeWidth">更改宽度</button>
  </div>
</template>

<style scoped>
.container {
  container-type: inline-size;
  width: 100vw;
}
</style>
