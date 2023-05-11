<script setup lang="ts">
import { computed } from 'vue';
import { Card } from 'churchtools-styleguide';
import { KEY } from '../main';
import useCustommodule from '../custommodule/useCustommodule';
const { categories } = useCustommodule(KEY);
const projects = computed<Project[]>(() =>
    categories.value.filter((cat) => cat.shorty?.startsWith('project'))
);
</script>
<template>
    <div
        class="mx-auto grid w-full max-w-[920px] gap-4 px-4 md:grid-cols-2 md:pt-4 lg:pt-8"
    >
        <RouterLink
            v-for="project in projects"
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
