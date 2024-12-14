<template>
  <el-table
    ref="singleTableRef"
    :data="tableData"
    highlight-current-row
    style="width: 100%"
    @current-change="handleCurrentChange"
  >
    <el-table-column type=" " width="10">
      <template #default="{ row }">
        <el-radio v-model="radioValue" :label="row.id"><span></span></el-radio>
      </template>
    </el-table-column>
    <el-table-column type="index" label="序号" width="100" />
    <el-table-column property="date" label="Date" width="120" />
    <el-table-column property="name" label="Name" width="120" />
    <el-table-column property="address" label="Address" />
  </el-table>
</template>
<script setup lang="ts">
  // import { onMounted } from "vue"
  // import { get } from "@/composable/use-request"

  // onMounted(async () => {
  //   const response = await get('/page')
  //   console.log(response, "===>response")
  // })
  import { ref } from "vue";
  const tableData = [
  {
    id: 1,
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 2,
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 3,
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 4,
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]

const radioValue = ref();
const handleCurrentChange = (record) => {
  console.log(record, "record")
  radioValue.value = record.id
}


</script>
<style lang="scss" scoped></style>
