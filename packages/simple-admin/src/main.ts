import './assets/styles/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import { Icon } from '@iconify/vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import Draggable from 'vuedraggable';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import simpleUi from '@simple/ui';
import '@simple/ui/style';

const app = createApp(App);

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus);
app.use<{ platform: 'editor' | 'user' }>(simpleUi, { platform: 'editor' });
app.use(createPinia());
app.use(router);

app.component('Icon', Icon); // 注册ICon全局组件
app.component('Draggable', Draggable); // 注册拖拽
app.component('QuillEditor', QuillEditor)

app.mount('#app');
