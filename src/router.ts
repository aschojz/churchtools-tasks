import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import FormsOverview from './FormsOverview.vue';
import FormDetail from './FormDetail.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/:formId',
        name: 'form-detail',
        component: FormDetail,
        props: true,
    },
    { path: '', name: 'overview', component: FormsOverview },
];

export const router = createRouter({
    routes,
    history: createWebHistory('/ccm/forms/'),
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return { el: to.hash, left: 0, top: 70 };
        } else if (savedPosition) {
            return savedPosition;
        } else if (to.name !== from.name) {
            return { left: 0, top: 0 };
        }
        return {};
    },
});
