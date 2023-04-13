<script setup lang="ts">
import { Button, DomainObject } from 'churchtools-styleguide';
import useProjects from '../../composables/useProjects';
import ProjectDialog from './ProjectDialog.vue';
import { ref } from 'vue';
const { project, projects, deleteProject } = useProjects();

const projectIsOpen = ref<Project>();
</script>
<template>
    <div class="grid grid-cols-5 min-h-screen theme-back">
        <div class="flex flex-col border-r border-gray-300">
            <div class="flex gap-2 justify-between items-center px-4 py-2">
                <div class="text-lg font-bold">Aufgabenverwaltung</div>
                <Button
                    size="S"
                    outlined
                    icon="fas fa-plus"
                    color="green"
                    @click="projectIsOpen = {}"
                />
            </div>
            <RouterLink
                v-for="p in projects"
                :key="p.shorty"
                :to="{ name: 'project', params: { projectId: p.id } }"
                :style="`--active-color: var(--${p.color ?? 'primary'}-50)`"
                class="px-2 py-2 flex items-center gap-3 justify-between group rounded ml-2 mr-4"
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
                <div class="flex-grow font-bold">
                    {{ p.name }}
                </div>
                <div class="gap-3 hidden group-hover:flex">
                    <Button
                        icon="fas fa-cog"
                        size="S"
                        text
                        color="gray"
                        @click="projectIsOpen = p"
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
        <div class="col-span-4 flex flex-col">
            <div class="px-4 pt-3 flex flex-col gap-2">
                <div class="flex gap-3 items-center text-lg font-bold">
                    <i
                        :class="project?.icon"
                        :style="`color: var(--${project?.color}-500)`"
                    ></i>
                    <div :style="`color: var(--${project?.color}-900)`">
                        {{ project?.name }}
                    </div>
                </div>
                <div v-if="project.description" class="text-sec">
                    {{ project.description }}
                </div>
            </div>
            <RouterView />
        </div>
        <ProjectDialog
            v-if="projectIsOpen"
            :project="projectIsOpen"
            @close="projectIsOpen = undefined"
        />
    </div>
</template>
<style scoped>
.router-link-active {
    background: var(--active-color);
}
</style>
