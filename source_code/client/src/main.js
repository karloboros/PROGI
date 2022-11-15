import App from './App.vue';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import naive from 'naive-ui';
import router from './router';
import { vAutofocus } from './directives';

createApp(App).use(router).use(createPinia()).use(naive).directive('autofocus', vAutofocus).mount('#app');
