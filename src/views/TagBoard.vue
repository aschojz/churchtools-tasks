<script setup lang="ts">
import { computed } from 'vue';
import List from '../components/List.vue';
import useTasks from '../composables/useTasks';
import ViewWrapper from './ViewWrapper.vue';
import useTags from '../composables/useTags';
import { Tag } from 'churchtools-styleguide';

const { projectId, tasks, showTask } = useTasks();
const { tagsArray } = useTags();

const tasksByTag = computed(() => {
    const tagLists: Record<number, TransformedTask[]> = { 0: [] };
    tasks.value.forEach((task) => {
        if (showTask(task)) {
            if (task.tags?.length) {
                task.tags?.forEach((tag) => {
                    tagLists[tag] ??= [];
                    tagLists[tag].push(task);
                });
            } else {
                tagLists[0].push(task);
            }
        }
    });
    return tagLists;
});

const boardlists = computed(() => {
    const li: TransformedList[] = tagsArray.value.map((tag) => ({
        ...tag,
    }));
    li.unshift({
        id: 0,
        name: 'Kein Tag',
        dataCategoryId: projectId.value,
        sortKey: 0,
        type: 'list',
    });
    return li;
});
</script>
<template>
    <ViewWrapper>
        <template v-for="list in boardlists" :key="list.id">
            <List
                v-if="tasksByTag[list.id]"
                :list="list"
                :items="tasksByTag[list.id]"
                :is-draggable="false"
            >
                <template #header>
                    <Tag
                        :label="list.name"
                        :color="list.color?.key ?? 'gray'"
                    />
                </template>
            </List>
        </template>
    </ViewWrapper>
</template>
