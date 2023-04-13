import { createApp } from 'vue';
import './assets/fontawesome/css/all.css';
import './style.css';
import './ct.css';
import App from './App.vue';
import { mixins } from './utils/mixins';
import { churchtoolsClient } from '@churchtools/churchtools-client';
import { createPinia } from 'pinia';
import { ctUtils } from '@churchtools/utils';
import { router } from './router';

churchtoolsClient.setBaseUrl('https://churchtools.test');
await churchtoolsClient.post('/login', {
    username: 'churchtools',
    password: 'churchtools',
});

const KEY = 'tasks';

const app = createApp(App);
const pinia = createPinia();
window.ctPinia = pinia;
app.use(pinia);
app.use(ctUtils, {
    baseUrl: 'https://churchtools.test',
    pinia,
    t: (e: string) => e,
});
app.mixin(mixins);
app.directive('tippy', () => null);
app.use(router);
app.mount('#app');

export { KEY };
