import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import '@simple/ui/style' // 引入simple-ui库的样式

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
