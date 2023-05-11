<script setup lang="ts">
import { computed } from 'vue';
import useTasks from '../composables/useTasks';
import ViewWrapper from './ViewWrapper.vue';
import TaskItem from '../components/TaskItem.vue';

const { tasks, showTask } = useTasks();
const filteredTasks = computed(() =>
    tasks.value.filter((task) => showTask(task))
);
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
