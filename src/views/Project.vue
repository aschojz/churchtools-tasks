<script setup lang="ts">
import { Button, DomainObject } from 'churchtools-styleguide';
import useProjects from '../composables/useProjects';

const emit = defineEmits<{
    (event: 'edit-project', project: Project): void;
}>();
const { project, projects, deleteProject } = useProjects();
</script>
<template>
    <div class="theme-back grid flex-grow grid-cols-5">
        <div class="hidden md:flex flex-col border-r border-gray-300 pt-4">
            <RouterLink
                v-for="p in projects"
                :key="p.shorty"
                :to="{ name: 'project', params: { projectId: p.id } }"
                :style="`--active-color: var(--${p.color ?? 'primary'}-50)`"
                class="group ml-2 mr-4 flex items-center justify-between gap-3 rounded px-2 py-2"
            >
                <DomainObject
                    :style="`--avatar-color: var(--${
                        p.color ?? 'primary'
                    }-500); --avatar-background: var(--${
                        p.color ?? 'primary'
                    }-100)`"
                    :domain-object="{
                        icon: p.icon ?? 'fas fa-th-large',
                    }"
                />
                <div
                    class="flex-grow overflow-hidden text-ellipsis whitespace-nowrap font-bold"
                >
                    {{ p.name }}
                </div>
                <div class="hidden gap-1 group-hover:flex">
                    <Button
                        icon="fas fa-cog"
                        size="S"
                        text
                        color="gray"
                        @click="emit('edit-project', p)"
                    />
                    <Button
                        icon="fas fa-trash-alt"
                        size="S"
                        text
                        color="red"
                        @click="deleteProject(p.id)"
                    />
                </div>
            </RouterLink>
        </div>
        <div class="col-span-5 md:col-span-4 flex flex-col">
            <div class="flex flex-col gap-2 px-4 pt-3">
                <div class="flex items-center gap-3 text-lg font-bold">
                    <i
                        :class="project?.icon"
                        :style="`color: var(--${project?.color}-500)`"
                    ></i>
                    <div :style="`color: var(--${project?.color}-900)`">
                        {{ project?.name }}
                    </div>
                </div>
                <div v-if="project?.description" class="text-sec">
                    {{ project.description }}
                </div>
            </div>
            <RouterView />
        </div>
    </div>
</template>
<style scoped>
.router-link-active {
    background: var(--active-color);
}
</style>
