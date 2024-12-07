<template>
  <div class="container">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="auto" style="width: 400px">
      <el-form-item label="账户名" prop="username">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label=" ">
        <el-button class="button" type="primary" @click="onSubmit">
          登录
        </el-button>
    </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
  import { ElMessage }  from "element-plus";
  import { reactive, ref } from "vue"
  import { useRouter } from "vue-router"
  import { userLoginAsync } from "@/api/user"
  import { md5 } from "@/utils/index"
  import { useUserStore } from "@/stores/user"

  const form = reactive({
    username: "",
    password: "",
    passwordConfirm: ""
  })

  const formRef = ref();
  const rules = reactive({
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' }
    ]
  })

  const router = useRouter();
  const userStore = useUserStore();
  const onSubmit = () => {
    formRef.value.validate(async (valid: boolean) => {
      if(!valid) return
      const params = {
        username: form.username,
        password: md5(form.password)
      }
      const data = await userLoginAsync(params)
      userStore.setToken(data.token)
      userStore.setRole(data.role)
      ElMessage.success("登录成功 ！")
      router.push("/")
    })
  }
</script>
<style scoped>
.container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.button {
  margin: 0 auto;
}
</style>
