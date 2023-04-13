<script setup lang="ts">
import { ref, computed } from 'vue';
import { Button, Input, SelectDropdown } from 'churchtools-styleguide';
import useCustommodule from '../../custommodule/useCustommodule';
import List from './List.vue';
import { KEY } from '../../main';
import TaskDialog from './TaskDialog.vue';
import useTasks from '../../composables/useTasks';

const { createValue } = useCustommodule(KEY);

const { projectId, lists, tasksByList, taskIsOpen } = useTasks();

const fullscreen = ref(false);
const onFullscreen = () => {
    fullscreen.value = !fullscreen.value;
};

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

const sortByRef = ref('sortKey');
const sortByOptions = [
    { id: 'sortKey', name: 'Manuell' },
    { id: 'dueDate', name: 'Fälligkeit' },
];

const bool = () => !!Math.round(Math.random());

const createList = () => {
    const i = Math.floor(Math.random() * 100);
    const list: TaskList = {
        type: 'list',
        name: `Liste ${i}`,
        sortKey: i,
        isCollapsed: bool(),
    };
    createValue({
        dataCategoryId: projectId.value,
        value: JSON.stringify(list),
    });
};
const onSort = () => {
    console.log('sort');
};

const openBoardSettings = () => {
    alert('TODO: Board settings einstellen');
};
</script>
<template>
    <div
        class="w-full flex-grow flex flex-col"
        :class="{
            'bg-gray-100 w-screen h-screen left-0 top-0 fixed': fullscreen,
        }"
    >
        <div
            class="w-full p-4 gap-2 items-center flex border-solid border-gray-300 border-b"
        >
            <Input
                label="Suche"
                :show-label="false"
                placeholder="Suchen"
                class="flex-grow"
            />
            <SelectDropdown
                v-model="sortByRef"
                :options="sortByOptions"
                emit-id
                :clear="false"
                @update:model-value="onSort"
            />
            <Button icon="fas fa-plus" outlined @click="createList"></Button>
            <Button
                icon="fas fa-cog"
                color="gray"
                outlined
                @click="openBoardSettings"
            ></Button>
            <Button
                outlined
                color="gray"
                icon="fas fa-expand-arrows-alt"
                @click="onFullscreen"
            ></Button>
        </div>
        <div class="overflow-auto max-w-full flex-grow">
            <div class="flex overflow-x-auto h-full gap-4 p-4">
                <List
                    v-for="list in boardlists"
                    :key="list.id"
                    :list="list"
                    :items="tasksByList[list.id]"
                />
            </div>
        </div>
        <TaskDialog v-if="taskIsOpen" />
    </div>
</template>
