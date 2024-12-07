import { defineStore } from "pinia"


export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || "",
    role: 10
  }),
  getters: {
    // 是否是管理员角色
    isAdminRole: (state) => state.role === 20
  },
  actions: {
    setToken(value: string) {
      this.token = value
      localStorage.setItem("token", this.token)
    },
    setRole(value: number) {
      this.role = value
    }
  }
})
