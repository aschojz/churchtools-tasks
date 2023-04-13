<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import useCustommodule from '../../custommodule/useCustommodule';
import TaskDialog from './TaskDialog.vue';
import Task from './TaskItem.vue';
import draggable from 'vuedraggable';
import { Button, Tag } from 'churchtools-styleguide';
import { KEY } from '../../main';

const { updateValues } = useCustommodule(KEY);
const { currentRoute } = useRouter();

const props = defineProps<{
    list: TransformedList;
}>();

const currentProjectId = computed(() => {
    const id = Array.isArray(currentRoute.value.params.projectId)
        ? currentRoute.value.params.projectId[0]
        : currentRoute.value.params.projectId;
    return parseInt(id);
});

watch(
    () => props.list.items,
    () => {
        internItems.value = [...props.list.items];
    }
);

const isCollapsed = ref(props.list.isCollapsed);

const newTask = ref({} as TransformedTask);
const newTaskIsOpen = ref(false);

const internItems = ref(props.list.items);
const drag = ref(false);
const onMoveEnd = () => {
    const newValues = [];
    internItems.value.forEach((item, index) => {
        if (index !== item.sortKey) {
            newValues.push({ ...item, sortKey: index });
        }
    });
    updateValues(newValues);
};
</script>
<template>
    <div
        class="bg-gray-50 shadow-md rounded-lg p-2 flex-shrink-0"
        :class="isCollapsed ? 'w-12 min-h-[300px] ' : 'w-96'"
    >
        <div
            :class="{
                'mb-3 flex gap-2 justify-between items-center': !isCollapsed,
                'flex flex-col items-center min-h-96 gap-2': isCollapsed,
            }"
        >
            <button
                class="bg-gray-50 text-gray-400 rounded h-6 flex items-center justify-center w-6 flex-shrink-0 my-auto"
                :class="{ 'm-2': isCollapsed }"
                @click="isCollapsed = !isCollapsed"
            >
                <i
                    v-if="isCollapsed"
                    class="fas fa-angle-down relative left-px"
                ></i>
                <i v-else class="fas fa-angle-right relative top-px"></i>
            </button>
            <div class="inline-flex overflow-hidden items-center flex-grow">
                <span
                    class="text-xl font-bold whitespace-nowrap text-ellipsis overflow-hidden"
                    :style="
                        isCollapsed
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
                    :style="
                        isCollapsed
                            ? 'margin: calc(50% - 8px) 0; transform: rotate(90deg)'
                            : ''
                    "
                >
                    <Tag
                        icon="fas fa-tasks"
                        color="secondary"
                        size="0"
                        :label="list.items?.length"
                    />
                    <Button
                        v-if="!isCollapsed"
                        icon="fas fa-plus"
                        size="S"
                        outlined
                        @click="newTaskIsOpen = !newTaskIsOpen"
                    />
                    <Button
                        v-if="!isCollapsed"
                        icon="fas fa-cog"
                        color="gray"
                        size="S"
                        outlined
                    />
                </span>
            </div>
        </div>
        <div v-if="!isCollapsed" class="flex flex-col gap-2">
            <draggable
                v-if="internItems.length"
                :list="internItems"
                item-key="id"
                class="flex flex-col gap-2"
                @start="drag = true"
                @end="onMoveEnd"
            >
                <template #item="{ element }">
                    <Task :item="element" />
                </template>
            </draggable>
        </div>
        <TaskDialog
            v-if="newTaskIsOpen"
            :task="newTask"
            create
            @close="newTaskIsOpen = false"
        />
    </div>
</template>
