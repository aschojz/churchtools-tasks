<script setup lang="ts">
import { Button } from 'churchtools-styleguide';
import { tx } from '@churchtools/utils';
import { computed, ref } from 'vue';
import ProjectDialog from './components/ProjectDialog.vue';
import { KEY } from './main';
import useCustommodules from './custommodule/useCustommodules';
import useCustommodule from './custommodule/useCustommodule';

const { loadModule } = useCustommodules();
const { loadCategories, loadValues } = useCustommodule(KEY);
const initModule = async () => {
    await loadModule(KEY);
    await loadCategories();
    await loadValues();
};
initModule();
const onNewProject = () => (projectIsOpen.value = {} as Project);
const projectIsOpen = ref<Project>();
const isDev = computed(() => import.meta.env.MODE === 'development');

const isSmallScreen = computed(() => window.innerWidth < 768);
</script>
<template>
    <div v-if="isDev" class="h-14 w-full bg-primary-900"></div>
    <div id="tasks" class="bg-back flex flex-col">
        <div
            class="theme-border bg-front flex w-full items-center justify-between gap-6 border-0 border-b border-solid px-6 py-3.5 text-lg"
        >
            <div class="flex flex-grow gap-6 divide-x font-bold">
                <div class="flex h-7 items-baseline gap-4">
                    <router-link
                        style="--color-link: var(--theme-text)"
                        class="flex h-7 items-baseline gap-4 hover:no-underline"
                        to="/"
                    >
                        <i
                            class="fas fa-tasks text-ter w-6 text-center text-base"
                        ></i>
                        <span>{{ tx('Aufgabenverwaltung') }}</span>
                    </router-link>
                    <Tag
                        class="text-base font-normal"
                        color="violet"
                        label="Beta"
                        size="M"
                    />
                </div>
            </div>
            <div class="flex items-center gap-4">
                <Button
                    icon="fas fa-bug"
                    outlined
                    size="S"
                    color="violet"
                    target="_blank"
                    href="https://github.com/aschojz/churchtools-tasks/issues"
                    :label="isSmallScreen ? '' : 'Fehler melden'"
                    ></Button
                >
                <template v-if="$route.name === 'overview'">
                    <div v-if="!isSmallScreen" class="bg-border h-6 w-px"></div>
                    <Button
                        size="S"
                        icon="fas fa-plus"
                        color="green"
                        :label="isSmallScreen ? '' : tx('Neues Projekt')"
                        @click="onNewProject"
                    >
                    </Button>
                </template>
            </div>
        </div>
        <RouterView @edit-project="projectIsOpen = $event"></RouterView>
    </div>
    <ProjectDialog
        v-if="projectIsOpen"
        :project="projectIsOpen"
        @close="projectIsOpen = undefined"
    />
</template>
<style>
body {
    font-size: 14px;
    --color-link: var(--theme-text);
}
#app a:hover {
    text-decoration: none;
}
#tasks {
    min-height: calc(100vh - 56px);
}
</style>
