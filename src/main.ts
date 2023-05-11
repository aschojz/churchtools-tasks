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

const baseUrl = window.settings?.base_url ?? 'https://churchtools.test';
churchtoolsClient.setBaseUrl(baseUrl);

const KEY = 'tasks';

const app = createApp(App);
const pinia = createPinia();

app.mixin(mixins);
app.use(pinia);
app.use(ctUtils, {
    baseUrl,
    pinia,
    t: window.t ?? ((e: string) => e),
});
app.directive('tippy', () => null);
app.use(router);
app.mount('#app');

if (import.meta.env.MODE === 'development') {
    await churchtoolsClient.post('/login', {
        username: 'churchtools',
        password: 'churchtools',
    });
    window.t = (string) => string;
}

export { KEY };
