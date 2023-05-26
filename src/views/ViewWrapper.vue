<script setup lang="ts">
import { Button, Input, Toggle } from 'churchtools-styleguide';
import { ref } from 'vue';
import TaskDialog from '../components/taskDialog/TaskDialog.vue';
import { taskStore } from '../composables/storeTasks';
import useTasks from '../composables/useTasks';
import useCustommodule from '../custommodule/useCustommodule';
import { KEY } from '../main';

const { createValue } = useCustommodule(KEY);
const { projectId, taskIsOpen } = useTasks();

withDefaults(
    defineProps<{
        subTaskToggle?: boolean;
    }>(),
    { subTaskToggle: true }
);

const fullscreen = ref(false);
const onFullscreen = () => {
    fullscreen.value = !fullscreen.value;
};

const bool = () => !!Math.round(Math.random());

const createList = () => {
    const i = Math.floor(Math.random() * 100);
    const list: TaskList = {
        type: 'list',
        name: `Liste ${i}`,
        sortKey: i,
        isCollapsed: bool(),
    };
    createValue({
        dataCategoryId: projectId.value,
        value: JSON.stringify(list),
    });
};

const openBoardSettings = () => {
    alert('TODO: Board settings einstellen');
};
const store = taskStore();
</script>
<template>
    <div
        class="flex w-full flex-grow flex-col"
        :class="{
            'fixed left-0 top-0 z-[2000] h-screen w-screen bg-gray-100':
                fullscreen,
        }"
    >
        <div
            class="w-full items-center border-b border-solid border-gray-300 px-4"
        >
            <div class="flex gap-2 py-4">
                <Input
                    label="Suche"
                    :show-label="false"
                    placeholder="Suchen"
                    class="flex-grow"
                />
                <slot name="actions">
                    <Button
                        icon="fas fa-cog"
                        color="gray"
                        outlined
                        @click="openBoardSettings"
                    ></Button>
                    <Button
                        outlined
                        color="gray"
                        icon="fas fa-expand-arrows-alt"
                        @click="onFullscreen"
                    ></Button>
                </slot>
            </div>
            <div class="flex justify-between">
                <div class="tabs flex gap-1">
                    <RouterLink
                        v-tippy="'Sortiert nach benutzerdefinierten Listen'"
                        :to="{ name: 'project-board' }"
                        >Board</RouterLink
                    >
                    <RouterLink :to="{ name: 'project-list' }"
                        >Liste</RouterLink
                    >
                    <RouterLink :to="{ name: 'project-tags' }">Tags</RouterLink>
                    <RouterLink :to="{ name: 'project-tasks' }"
                        >Aufgaben</RouterLink
                    >
                </div>
                <div class="flex gap-4">
                    <div v-if="subTaskToggle" class="flex items-center gap-1">
                        <span>Subtasks anzeigen</span>
                        <Toggle
                            v-model="store.showSubTasks"
                            label="Subtasks anzeigen"
                        />
                    </div>
                    <div class="flex items-center gap-1">
                        <span>Erfüllte anzeigen</span>
                        <Toggle
                            v-model="store.showFullfilled"
                            label="Erfüllte anzeigen"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="max-w-full flex-grow overflow-auto">
            <div class="flex h-full gap-4 overflow-x-auto p-4">
                <slot></slot>
            </div>
        </div>
        <TaskDialog v-if="taskIsOpen" />
    </div>
</template>
<style scoped>
.tabs a {
    padding: 8px 12px;
    @apply rounded-t bg-gray-200;
}
a.router-link-active {
    background: var(--primary-500);
    color: white;
}
</style>
