<script setup lang="ts">
import { ref, watch } from 'vue';
import useCustommodule from '../../custommodule/useCustommodule';
import Task from './TaskItem.vue';
import draggable from 'vuedraggable';
import { Button, Tag } from 'churchtools-styleguide';
import { KEY } from '../../main';
import NewTask from './NewTask.vue';
import useLists from '../../composables/useLists';

const { updateValues, updateValue } = useCustommodule(KEY);

const props = withDefaults(
    defineProps<{
        list: TransformedList;
        items: TransformedTask[];
    }>(),
    { items: () => [] }
);

watch(
    () => props.items,
    () => {
        internItems.value = [...props.items];
    }
);

const { updateList } = useLists();
const onUpdateList = (list: Partial<TaskList>) => {
    updateList({ ...props.list, ...list });
};

const newTaskIsOpen = ref(false);

const internItems = ref(props.items);
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
        class="bg-gray-50 shadow-md rounded-lg p-2 flex-shrink-0 flex flex-col"
        :class="list.isCollapsed ? 'w-12 min-h-[300px] ' : 'w-96'"
    >
        <div
            :class="{
                'mb-3 flex gap-2 justify-between items-center':
                    !list.isCollapsed,
                'flex flex-col items-center min-h-96 gap-2': list.isCollapsed,
            }"
        >
            <button
                class="bg-gray-50 text-gray-400 rounded h-6 flex items-center justify-center w-6 flex-shrink-0 my-auto"
                :class="{ 'm-2': list.isCollapsed }"
                @click="onUpdateList({ isCollapsed: !list.isCollapsed })"
            >
                <i
                    v-if="list.isCollapsed"
                    class="fas fa-angle-down relative left-px"
                ></i>
                <i v-else class="fas fa-angle-right relative top-px"></i>
            </button>
            <div class="inline-flex overflow-hidden items-center flex-grow">
                <span
                    class="text-xl font-bold whitespace-nowrap text-ellipsis overflow-hidden"
                    :style="
                        list.isCollapsed
                            ? 'margin: calc(50% - 8px) 0; transform: rotate(90deg)'
                            : ''
                    "
                >
                    {{ list.name }}
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
                        :label="internItems?.length"
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
        <div v-if="!list.isCollapsed" class="flex flex-col gap-2 flex-grow">
            <NewTask
                v-if="newTaskIsOpen"
                :list="list"
                @close="newTaskIsOpen = false"
            />
            <draggable
                :list="internItems"
                item-key="id"
                group="tasks"
                class="flex flex-col gap-2 min-h-full"
                @change="onTaskDrop"
                @end="onMoveEnd"
            >
                <template #item="{ element }">
                    <Task :item="element" />
                </template>
            </draggable>
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
