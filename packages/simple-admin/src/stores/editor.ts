import { defineStore } from 'pinia'

export const useCounterStore = defineStore('editor', {
  state: () => {
    return {
      count: 0
    }
  },
  actions: {
    setCount () {
      this.count++
    }
  }
})
