<script setup lang="ts">
import { computed } from 'vue';
import List from '../components/List.vue';
import useTasks from '../composables/useTasks';
import ViewWrapper from './ViewWrapper.vue';
import { taskStore } from '../composables/storeTasks';
import ProgressRing from '../components/ProgressRing.vue';

const { tasks, tasksObject, getPercentFullfilled } = useTasks();
const store = taskStore();

const tasksByParent = computed(() => {
    const tasksWithSub = tasks.value.filter((task) => task.subTasks?.length);
    return Object.fromEntries(
        tasksWithSub.map((parent) => [
            parent.id,
            parent.subTasks
                ?.map((st) => tasksObject.value[st])
                .filter(
                    (st) =>
                        !!st &&
                        ((!store.showFullfilled && !st.fullfilled) ||
                            store.showFullfilled),
                ),
        ]),
    );
});

const boardlists = computed(() => {
    const li: TransformedList[] = tasks.value
        .filter(
            (task) =>
                task.subTasks?.filter((st) => tasksObject.value[st]).length,
        )
        .map((task) => ({
            id: task.id,
            name: task.name,
            percentage: getPercentFullfilled(task),
        }));
    return li;
});
</script>
<template>
    <ViewWrapper :sub-task-toggle="false">
        <template v-for="list in boardlists" :key="list.id">
            <List
                :list="list"
                :items="tasksByParent[list.id]"
                :show-task="true"
            >
                <template #header>
                    <ProgressRing
                        :percent="list.percentage"
                        class="progress-icon relative text-[20px] text-gray-500"
                    />
                    <span>{{ list.name }}</span>
                </template>
            </List>
        </template>
    </ViewWrapper>
</template>
