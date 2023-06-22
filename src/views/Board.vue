<script setup lang="ts">
import { computed } from 'vue';
import List from '../components/List.vue';
import useTasks from '../composables/useTasks';
import ViewWrapper from './ViewWrapper.vue';
import { taskStore } from '../composables/storeTasks';

const { lists, transformedTasks, showTask } = useTasks();
const store = taskStore();

const boardlists = computed(() => {
    const li: TransformedList[] = [...lists.value];
    li.unshift(store.unsortedList as TransformedList);
    return li;
});

const tasksByList = computed(() => {
    const items: Record<number, TransformedTask[]> = {};
    const existingLists = boardlists.value.map((l) => l.id);
    transformedTasks.value.forEach((task) => {
        if (showTask(task)) {
            const listId = existingLists.includes(task.list ?? 0)
                ? task.list ?? 0
                : 0;
            items[listId] ??= [];
            items[listId].push(task);
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
