import { churchtoolsClient } from '@churchtools/churchtools-client';
import { ctUtils } from '@churchtools/utils';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import '../node_modules/churchtools-styleguide/dist/style.css';
import App from './App.vue';
import './assets/fontawesome/css/all.css';
import { router } from './router';
import './style.css';
import { mixins } from './utils/mixins';

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
