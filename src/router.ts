import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Project from '@/views/Project.vue';
import Board from '@/views/Board.vue';
import ListView from '@/views/ListView.vue';
import TagBoard from '@/views/TagBoard.vue';
import TaskBoard from '@/views/TaskBoard.vue';
import Overview from '@/views/Overview.vue';
import MyTasksList from '@/views/MyTasksList.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/:projectId',
        component: Project,
        children: [
            {
                path: 'list/:taskId?',
                name: 'project-list',
                component: ListView,
            },
            {
                path: 'tags/:taskId?',
                name: 'project-tags',
                component: TagBoard,
            },
            {
                path: 'tasks/:taskId?',
                name: 'project-tasks',
                component: TaskBoard,
            },
            { path: 'board/:taskId?', name: 'project-board', component: Board },
            {
                path: 'my-tasks/:taskId?',
                name: 'my-tasks',
                component: MyTasksList,
            },
            { path: '', redirect: { name: 'my-tasks' }, name: 'project' },
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
