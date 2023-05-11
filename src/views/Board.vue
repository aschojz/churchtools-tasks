<script setup lang="ts">
import { computed } from 'vue';
import List from '../components/List.vue';
import useTasks from '../composables/useTasks';
import ViewWrapper from './ViewWrapper.vue';

const { projectId, lists, tasks, showTask } = useTasks();

const boardlists = computed(() => {
    const li: TransformedList[] = [...lists.value];
    li.unshift({
        id: 0,
        name: 'Unsortiert',
        dataCategoryId: projectId.value,
        sortKey: 0,
        type: 'list',
    });
    return li;
});

const tasksByList = computed(() => {
    const items: Record<number, TransformedTask[]> = {};
    tasks.value.forEach((task) => {
        if (showTask(task)) {
            items[task.list ?? 0] ??= [];
            items[task.list ?? 0].push(task);
        }
    });
    return items;
});
</script>
<template>
    <ViewWrapper>
        <List
            v-for="list in boardlists"
            :key="list.id"
            :list="list"
            :items="tasksByList[list.id]"
        />
    </ViewWrapper>
</template>
