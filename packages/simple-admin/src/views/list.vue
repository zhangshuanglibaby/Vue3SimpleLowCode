<template>
  <div>
    <h1>列表页</h1>
  </div>
</template>
<script setup lang="ts">
  import { onMounted } from "vue"
  import { get } from "@/composable/use-request"

  onMounted(async () => {
    const response = await get('/page')
    console.log(response, "===>response")
  })

</script>
<style lang="scss" scoped></style>
