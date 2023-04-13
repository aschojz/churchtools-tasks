import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Project from './views/project/Project.vue';
import Board from './views/project/Board.vue';
import Overview from './views/overview/Overview.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/:projectId',
        component: Project,
        children: [
            { path: 'board', name: 'project-board', component: Board },
            { path: '', redirect: { name: 'project-board' }, name: 'project' },
        ],
    },
    { path: '', name: 'overview', component: Overview },
];

export const router = createRouter({
    routes,
    history: createWebHistory(`/ccm/tasks/`),
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
