<script setup lang="ts">
import { tx } from '@churchtools/utils';
import { Button, Card } from 'churchtools-styleguide';
import { computed } from 'vue';
import useCustommodule from '../custommodule/useCustommodule';
import { KEY } from '../main';

defineEmits<{
    (event: 'edit-project', project: Project): void;
}>();
const { categories } = useCustommodule(KEY);
const projects = computed<Project[]>(() =>
    categories.value.filter((cat) => cat.shorty?.startsWith('project')),
);
</script>
<template>
    <div
        class="mx-auto grid w-full max-w-[920px] flex-grow items-start gap-4 px-4 pt-4 md:grid-cols-2 lg:pt-8"
    >
        <div
            v-if="projects.length === 0"
            class="col-span-2 flex flex-col items-center justify-center gap-8 text-gray-300"
        >
            <i class="fas fa-tasks fa-5x"></i>
            <div class="text-2xl font-bold">
                {{ tx('Noch keine Projekte') }}
            </div>
            <Button
                icon="fas fa-plus"
                color="green"
                @click="$emit('edit-project', {})"
                >{{ tx('Projekt anlegen') }}</Button
            >
        </div>
        <RouterLink
            v-for="project in projects"
            v-else
            :key="project.id"
            :to="{ name: 'project', params: { projectId: project.id } }"
        >
            <Card class="h-full hover:border-gray-300">
                <div class="flex items-center gap-4">
                    <div
                        class="flex h-10 w-10 items-center justify-center rounded-full"
                        :style="`color: var(--${project.color}-500); background: var(--${project.color}-100)`"
                    >
                        <i :class="project.icon"></i>
                    </div>
                    <div class="flex-grow text-xl font-bold">
                        {{ project.name }}
                    </div>
                    <i class="fas fa-chevron-right text-ter fa-fw"></i>
                </div>
                <div v-if="project.description" class="text-sec mt-3">
                    {{ project.description }}
                </div>
            </Card>
        </RouterLink>
    </div>
</template>
