import { churchtoolsClient } from '@churchtools/churchtools-client';
import { ctUtils } from '@churchtools/utils';
import { createPinia } from 'pinia';
import { createApp, h, provide } from 'vue';
import '../node_modules/churchtools-styleguide/dist/style.css';
import App from './App.vue';
import './assets/fontawesome/css/all.css';
import { router } from './router';
import './style.css';
import { mixins } from './utils/mixins';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';

const baseUrl = window.settings?.base_url ?? 'https://churchtools.test';
churchtoolsClient.setBaseUrl(baseUrl);

const KEY = 'tasks';

const cache = new InMemoryCache();
const apolloClient = new ApolloClient({
    cache,
    uri: 'https://api.fontawesome.com',
});

const app = createApp({
    setup() {
        provide(DefaultApolloClient, apolloClient);
    },
    render: () => h(App),
});
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
