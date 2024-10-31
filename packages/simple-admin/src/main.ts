import './assets/styles/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import { Icon } from '@iconify/vue';
import ElementPlus from 'element-plus';
import Draggable from 'vuedraggable';

const app = createApp(App);

app.use(ElementPlus);
app.use(createPinia());
app.use(router);

app.component('Icon', Icon); // 注册ICon全局组件
app.component('Draggable', Draggable); // 注册拖拽

app.mount('#app');
