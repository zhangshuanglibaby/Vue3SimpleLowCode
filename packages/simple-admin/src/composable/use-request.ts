import axios, { type AxiosRequestConfig } from "axios"
import router from "@/router/index"
import { ElMessage } from "element-plus"
import { useUserStore } from "@/stores/user"

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8081/rest/v1",
  timeout: 30000
})

// 添加请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么，比如添加token等
    const userStore = useUserStore()
    if(userStore.token) {
      config.headers['Authorization'] = `Bearer ${userStore.token}`
    }
    return config
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    const userStore = useUserStore()
    // 对响应数据做点什么，比如401错误 需要跳转到登录页
    if(response.data.code === 401) {
      userStore.setToken("") // 清除token
      router.replace("/login")
    }

    if(response.data.code !== 200) {
      ElMessage.error(response.data.message)
      return Promise.reject(response.data)
    }
    return response.data
  },
  (error) => {
    // 处理响应错误
    return Promise.reject(error)
  }
)

export async function get(url: string, data?:any, config?: AxiosRequestConfig) {
  const response = await axiosInstance.get(url, { ...config, params: data })
  return response.data
}

export async function post(url: string, data?:any, config?: AxiosRequestConfig) {
  const response = await axiosInstance.post(url, data, config)
  return response.data
}
