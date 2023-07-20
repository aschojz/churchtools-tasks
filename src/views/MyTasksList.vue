<script setup lang="ts">
import { sortBy } from 'lodash';
import { computed } from 'vue';
import TaskItem from '../components/TaskItem.vue';
import { taskStore } from '../composables/storeTasks';
import useTasks from '../composables/useTasks';
import ViewWrapper from './ViewWrapper.vue';
import { useMain } from '@churchtools/utils';

const { tasks, showTask, calculateDueDate } = useTasks();
const { currentUser } = useMain();

const store = taskStore();

const filteredTasks = computed(() => {
    const filtered = tasks.value.filter((task) => {
        return (
            showTask(task) && task.assignedTo?.includes(currentUser.value.id)
        );
    });
    return sortBy(
        filtered.map((t) => ({ ...t, dueDate: calculateDueDate(t) })),
        store.sortBy,
    );
});
</script>
<template>
    <ViewWrapper>
        <div class="flex w-full flex-col">
            <TaskItem
                v-for="task in filteredTasks"
                :key="task.id"
                :item="task"
                class="w-full"
            />
        </div>
    </ViewWrapper>
</template>
