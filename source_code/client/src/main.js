import App from './App.vue';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import naive from 'naive-ui';
import router from './router';

createApp(App).use(router).use(createPinia()).use(naive).mount('#app');
