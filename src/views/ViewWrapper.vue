<script setup lang="ts">
import { Button, Input, Toggle } from 'churchtools-styleguide';
import { ref } from 'vue';
import ListDialog from '../components/ListDialog.vue';
import TaskDialog from '../components/taskDialog/TaskDialog.vue';
import { taskStore } from '../composables/storeTasks';
import useTasks from '../composables/useTasks';

const { taskIsOpen } = useTasks();

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

const openBoardSettings = () => {
    alert('TODO: Board settings einstellen');
};
const store = taskStore();
const listIsOpen = ref(false);
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
                        v-if="$route.name === 'project-board'"
                        icon="fas fa-plus"
                        outlined
                        @click="listIsOpen = true"
                    ></Button>
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
        <div class="flex max-w-full flex-grow flex-col overflow-auto">
            <div class="flex h-full flex-grow gap-4 overflow-x-auto p-4">
                <slot></slot>
            </div>
        </div>
        <TaskDialog v-if="taskIsOpen" />
        <ListDialog v-if="listIsOpen" @close="listIsOpen = false" />
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
