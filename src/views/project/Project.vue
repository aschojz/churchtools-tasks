<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import useCustommodule from '../../custommodule/useCustommodule';
import { KEY } from '../../main';
const { categories, createCategory, custommodule } = useCustommodule(KEY);
const { currentRoute } = useRouter();
const projects = computed(() =>
    categories.value.filter((cat) => cat.shorty?.startsWith('project'))
);
const createNewProject = () => {
    const lastId = projects.value[projects.value.length - 1]?.id ?? 0;
    createCategory({
        name: `Foo ${lastId + 1}`,
        shorty: `project_foo_${lastId + 1}`,
        securityLevelId: 1,
        customModuleId: custommodule.value?.id,
        description: '',
        schema: '',
    });
};

const currentProject = computed(() =>
    projects.value.find(
        (pro) => String(pro.id) === currentRoute.value.params.projectId
    )
);
</script>
<template>
    <div class="grid grid-cols-5 min-h-screen theme-back">
        <div class="flex flex-col border-r border-gray-300">
            <div class="px-4 py-2">
                <button @click="createNewProject">+ Projekt anlegen</button>
            </div>
            <RouterLink
                v-for="project in projects"
                :key="project.shorty"
                :to="{ name: 'project', params: { projectId: project.id } }"
                class="px-4 py-2"
            >
                {{ project.name }}
            </RouterLink>
        </div>
        <div class="col-span-4 flex flex-col">
            <div class="text-lg font-bold px-4 pt-3">
                {{ currentProject?.name }}
            </div>
            <RouterView />
        </div>
    </div>
</template>
