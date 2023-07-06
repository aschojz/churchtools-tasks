<script setup lang="ts">
import { computed } from 'vue';
import List from '../components/List.vue';
import useTasks from '../composables/useTasks';
import ViewWrapper from './ViewWrapper.vue';
import useLists from '../composables/useLists';
import { sortBy } from 'lodash';

const { transformedTasks, showTask } = useTasks();
const { lists } = useLists();

const boardlists = computed(() => {
    const li = [...lists.value];
    return sortBy(li, 'sortKey');
});

const tasksByList = computed(() => {
    const items: Record<number, TransformedTask[]> = {};
    const existingLists = boardlists.value.map((l) => l.id);
    const defaultListId = lists.value.find((l) => l.isDefault)?.id ?? 0;
    transformedTasks.value.forEach((task) => {
        if (showTask(task)) {
            const listId = task.list && existingLists.includes(task.list)
                ? task.list 
                : defaultListId;
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
