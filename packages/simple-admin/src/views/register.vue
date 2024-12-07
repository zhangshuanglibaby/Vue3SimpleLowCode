<template>
  <div class="container">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="auto" style="width: 400px">
      <el-form-item label="账户名" prop="username">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="确认密码" prop="passwordConfirm">
        <el-input v-model="form.passwordConfirm" type="password" autocomplete="off"  />
      </el-form-item>
      <el-form-item label=" ">
        <el-button class="button" type="primary" @click="onSubmit(formRef)">
          创建账户
        </el-button>
    </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
  import { ElMessage, type FormInstance}  from "element-plus";
  import { reactive, ref } from "vue"
  import { useRouter } from "vue-router"
  import { userRegisterAsync } from "@/api/user"
  import { md5 } from "@/utils/index"

  const form = reactive({
    username: "",
    password: "",
    passwordConfirm: ""
  })

  const formRef = ref();

  const validatePass = (rule: any, value: any, callback: any) => {
    if(value !== form.password) {
      callback(new Error('两次密码输入不一致'))
    }else {
      callback()
    }
  }
  const rules = reactive({
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 6, max: 20, message: '长度最小6，最大20', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 8, max: 32, message: '长度最小8，最大32', trigger: 'blur' },
    ],
    passwordConfirm: [
      { required: true, message: '请输入确认密码', trigger: 'blur' },
      { min: 8, max: 32, message: '长度最小8，最大32', trigger: 'blur' },
      { validator:  validatePass, trigger: 'blur'}
    ],
  })

  const router = useRouter();
  const onSubmit = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
      if(!valid) {
        ElMessage.error('请完善表单')
        return
      }
      const params = {
        username: form.username,
        password: md5(form.password)
      }
      await userRegisterAsync(params)
      ElMessage.success("注册成功 ！")
      router.push("/login")
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
