import { createApp } from 'vue';
import './style.css';
import './assets/fontawesome/css/all.css';
import '../node_modules/churchtools-styleguide/dist/style.css';
import App from './App.vue';
import { mixins } from './utils/mixins';
import { churchtoolsClient } from '@churchtools/churchtools-client';
import { createPinia } from 'pinia';
import { router } from './router';

churchtoolsClient.setBaseUrl('https://churchtools.test');
await churchtoolsClient.post('/login', {
    username: 'churchtools',
    password: 'churchtools',
});

const KEY = 'tasks';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.mixin(mixins);
app.directive('tippy', () => null);

app.use(router);

app.mount('#app');
export { KEY };
