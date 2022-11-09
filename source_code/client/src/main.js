import App from './App.vue';
import { createApp } from 'vue';
import naive from 'naive-ui';
import router from './router';
import { vAutofocus } from './directives';

createApp(App).use(router).use(naive).directive('autofocus', vAutofocus).mount('#app');
