<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import Task from './TaskItem.vue';
import draggable from 'vuedraggable';
import { Button, Tag } from 'churchtools-styleguide';
import { KEY } from '../main';
import NewTask from './NewTask.vue';
import useLists from '../composables/useLists';
import { taskStore } from '../composables/storeTasks';
import { sortBy } from 'lodash';
import useTasks from '../composables/useTasks';
import useCustommodule from '../custommodule/useCustommodule';

const { updateValues, updateValue } = useCustommodule(KEY);
const store = taskStore();

const props = withDefaults(
    defineProps<{
        list: TransformedList;
        items: TransformedTask[];
        showTask?: boolean;
        isDraggable?: boolean;
    }>(),
    { items: () => [], isDraggable: true }
);

watch(
    () => props.items,
    () => {
        initItems(props.items);
    }
);

const { updateList } = useLists();
const onUpdateList = (list: Partial<TaskList>) => {
    updateList({ ...props.list, ...list });
};

const newTaskIsOpen = ref(false);

const initItems = (items: TransformedTask[]) => {
    internItems.value = items.map((item) => ({
        ...item,
        dueDate: calculateDueDate(item),
    }));
};
onMounted(() => initItems(props.items));
const internItems = ref();
const { calculateDueDate } = useTasks();
const sortedItems = computed(() => {
    console.log(store.sortBy);
    return sortBy(internItems.value, store.sortBy);
});
const onMoveEnd = () => {
    const newValues: TransformedTask[] = [];
    internItems.value.forEach((item, index) => {
        if (index !== item.sortKey) {
            newValues.push({ ...item, sortKey: index });
        }
    });
    updateValues(newValues);
};
const onTaskDrop = ({
    added,
}: {
    added: { element: TransformedTask; newIndex: number };
}) => {
    if (added) {
        updateValue({
            ...added.element,
            list: props.list.id,
            sortKey: added.newIndex,
        });
    }
};
</script>
<template>
    <div
        class="flex flex-shrink-0 flex-col rounded-lg bg-gray-50 p-2 shadow-md"
        :class="list.isCollapsed ? 'min-h-[300px] w-12 ' : 'w-96'"
    >
        <div
            :class="{
                'mb-3 flex items-center justify-between gap-2':
                    !list.isCollapsed,
                'min-h-96 flex flex-col items-center gap-2': list.isCollapsed,
            }"
        >
            <button
                class="my-auto flex h-6 w-6 flex-shrink-0 items-center justify-center rounded bg-gray-50 text-gray-400"
                :class="{ 'm-2': list.isCollapsed }"
                @click="onUpdateList({ isCollapsed: !list.isCollapsed })"
            >
                <i
                    v-if="list.isCollapsed"
                    class="fas fa-angle-down relative left-px"
                ></i>
                <i v-else class="fas fa-angle-right relative top-px"></i>
            </button>
            <div class="inline-flex flex-grow items-center overflow-hidden">
                <span
                    class="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap text-xl font-bold"
                    :style="
                        list.isCollapsed
                            ? 'margin: calc(50% - 8px) 0; transform: rotate(90deg)'
                            : ''
                    "
                >
                    <slot name="header" :list="list">{{ list.name }}</slot>
                </span>
            </div>
            <div class="inline-flex">
                <span
                    class="flex gap-2 whitespace-nowrap"
                    :class="{ 'items-center': !list.isCollapsed }"
                    :style="
                        list.isCollapsed
                            ? 'margin: calc(50% - 8px) 0; transform: rotate(90deg)'
                            : ''
                    "
                >
                    <Tag
                        v-if="internItems?.length"
                        icon="fas fa-tasks"
                        color="secondary"
                        size="0"
                        :label="String(internItems?.length)"
                    />
                    <Button
                        v-if="!list.isCollapsed"
                        icon="fas fa-plus"
                        size="S"
                        outlined
                        @click="newTaskIsOpen = !newTaskIsOpen"
                    />
                    <Button
                        v-if="!list.isCollapsed"
                        icon="fas fa-cog"
                        color="gray"
                        size="S"
                        outlined
                    />
                </span>
            </div>
        </div>
        <div v-if="!list.isCollapsed" class="flex flex-grow flex-col gap-2">
            <NewTask
                v-if="newTaskIsOpen"
                :list="list"
                @close="newTaskIsOpen = false"
            />
            <draggable
                v-if="isDraggable"
                :list="sortedItems"
                item-key="id"
                group="tasks"
                class="flex min-h-full flex-col gap-2"
                @change="onTaskDrop"
                @end="onMoveEnd"
            >
                <template #item="{ element }">
                    <Task :item="element" :show-task="showTask" />
                </template>
            </draggable>
            <template v-else>
                <Task
                    v-for="item in sortedItems"
                    :key="item.id"
                    :item="item"
                    :show-task="showTask"
                />
            </template>
        </div>
    </div>
</template>
<style>
.sortable-ghost {
    border: 2px dashed var(--gray-400);
}
.sortable-ghost > * {
    opacity: 0;
}
</style>
