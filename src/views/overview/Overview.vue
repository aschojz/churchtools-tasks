<script setup lang="ts">
import { computed } from 'vue';
import useCustommodule from '../../custommodule/useCustommodule';
const { categories } = useCustommodule('tasks');
const projects = computed(() =>
    categories.value.filter((cat) => cat.shorty?.startsWith('project'))
);
</script>
<template>
    <div class="flex gap-4 items-center justify-center">
        <RouterLink
            v-for="project in projects"
            :key="project.shorty"
            :to="{ name: 'project', params: { projectId: project.id } }"
            class="px-5 py-3 bg-gray-300"
        >
            {{ project.name }}
        </RouterLink>
    </div>
</template>
