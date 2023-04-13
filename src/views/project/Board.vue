<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { Button, Input, SelectDropdown } from 'churchtools-styleguide';
import { useRouter } from 'vue-router';
import useCustommodule from '../../custommodule/useCustommodule';
import List from './List.vue';
import draggable from 'vuedraggable';
import { sortBy } from 'lodash';
import { KEY } from '../../main';

const { createValue, valuesByCategory, valueStore } = useCustommodule(KEY);
const { currentRoute } = useRouter();

const fullscreen = ref(false);
const onFullscreen = () => {
    fullscreen.value = !fullscreen.value;
};

const values = computed(
    () => valuesByCategory.value[currentProjectId.value] ?? []
);

const tasks = computed<TransformedTask[]>(() =>
    values.value.filter(
        (v: TransformedTask | TransformedList) => v.type === 'task'
    )
);
onMounted(() => {
    initLists();
});
watch(
    () => valueStore.loadingState,
    () => {
        initLists();
    }
);
const initLists = () => {
    lists.value = values.value
        .filter((v: TransformedTask | TransformedList) => v.type === 'list')
        .map((l: TransformedList) => ({
            ...l,
            items: sortBy(tasks.value, sortByRef.value),
        }));
};
const sortByRef = ref('sortKey');
const sortByOptions = [
    { id: 'sortKey', name: 'Manuell' },
    { id: 'dueDate', name: 'Fälligkeit' },
];
const onSort = () => {
    initLists();
    console.log('fff');
};

const bool = () => !!Math.round(Math.random());

const currentProjectId = computed(() => {
    const id = Array.isArray(currentRoute.value.params.projectId)
        ? currentRoute.value.params.projectId[0]
        : currentRoute.value.params.projectId;
    return parseInt(id);
});

const createList = () => {
    const i = Math.floor(Math.random() * 100);
    const list: TaskList = {
        type: 'list',
        name: `Liste ${i}`,
        sortKey: i,
        isCollapsed: bool(),
    };
    createValue({
        dataCategoryId: currentProjectId.value,
        value: JSON.stringify(list),
    });
};

const lists = ref<TransformedList[]>([]);
const drag = ref(false);
const onMoveEnd = () => {
    console.log('s');
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
                @update:model-value="onSort"
            />
            <Button icon="fas fa-plus" outlined @click="createList"></Button>
            <Button
                outlined
                color="gray"
                icon="fas fa-expand-arrows-alt"
                @click="onFullscreen"
            ></Button>
        </div>
        <div class="overflow-auto max-w-full flex-grow">
            <draggable
                :list="lists"
                item-key="id"
                class="flex overflow-x-auto h-full gap-4 p-4"
                @start="drag = true"
                @end="onMoveEnd"
            >
                <template #item="{ element }">
                    <List :list="element" />
                </template>
            </draggable>
        </div>
    </div>
</template>
