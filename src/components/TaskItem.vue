<script setup lang="ts">
import {
    Button,
    DomainObject,
    DropdownMenu,
    Tag,
} from 'churchtools-styleguide';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import ProgressRing from '../components/ProgressRing.vue';
import useTask from '../composables/useTask';

const props = defineProps<{
    item: TransformedTask;
    showTask?: boolean;
}>();

const id = computed(() => props.item.id);
const {
    superParent,
    hasSubTasks,
    percentFullfilled,
    assignees,
    dueColor,
    dueDate,
    toggleTask,
    comments,
    deleteTask,
    task,
    sortedTags,
    toDayMonth,
} = useTask(id);

const router = useRouter();
const openTask = () => {
    router.push({ ...router.currentRoute, params: { taskId: props.item.id } });
};

const showLastRow = computed(
    () =>
        dueDate.value || props.item.comments?.length || props.item.tags?.length
);

const contextMenu = computed(() => [
    {
        items: [
            {
                id: 'fullfilled',
                label: props.item.fullfilled
                    ? 'Als nicht-erfüllt markieren'
                    : 'Abhaken',
                icon: props.item.fullfilled
                    ? 'far fa-square'
                    : 'fas fa-check-square',
                callback: () => toggleTask(),
            },
            {
                id: 'move',
                label: 'In anderes Projekt verschieben',
                icon: 'fas fa-arrow-left-long',
                callback: () => {
                    alert('TODO: change project');
                },
            },
        ],
    },
    {
        items: [
            {
                id: 'edit',
                label: 'Bearbeiten',
                icon: 'fas fa-pen',
                callback: () => openTask(),
            },
            {
                id: 'delete',
                label: 'Löschen',
                icon: {
                    icon: 'fas fa-trash-alt',
                    class: 'text-red-500',
                },
                callback: () => deleteTask(),
            },
        ],
    },
]);
</script>
<template>
    <div
        class="task-item group relative flex cursor-pointer flex-col justify-between gap-2 rounded border border-gray-100 bg-white p-3 shadow-sm transition-colors hover:border-gray-200"
        @click="openTask"
    >
        <div
            v-if="superParent && !showTask"
            class="-mb-1 flex gap-2 text-xs text-gray-400"
        >
            <span>{{ superParent.name }}</span>
            <i class="fas fa-arrow-turn-up fa-rotate-270"></i>
        </div>
        <div class="flex items-start justify-end gap-4">
            <div class="flex flex-grow items-start gap-2">
                <ProgressRing
                    v-if="hasSubTasks"
                    :percent="percentFullfilled"
                    class="progress-icon relative text-[20px] text-gray-500"
                />
                <template v-else>
                    <i
                        v-if="item.fullfilled"
                        class="far fa-check-square text-[20px] text-green-500"
                        @click.stop="toggleTask"
                    ></i>
                    <i
                        v-else
                        class="far fa-square text-[20px] text-gray-500"
                        @click.stop="toggleTask"
                    ></i>
                </template>
                <span class="font-bold"> {{ item.name }} </span>
            </div>
            <div
                v-if="item.assignedTo?.length"
                class="flex flex-shrink-0 gap-1"
            >
                <DomainObject
                    v-for="assignee in assignees"
                    :key="assignee.id"
                    :domain-object="assignee"
                    size="XS"
                />
            </div>
            <DropdownMenu
                :button-bind="{
                    class: 'absolute hidden right-1 top-1 group-hover:inline-flex',
                }"
                :menu-items="contextMenu"
            >
                <Button icon="fas fa-ellipsis" size="S" outlined color="gray" />
            </DropdownMenu>
        </div>
        <div v-if="item.description" class="l line-clamp-1">
            {{ item.description }}
        </div>
        <div v-if="showLastRow" class="flex flex-wrap justify-end gap-2">
            <div class="flex flex-grow items-center gap-3 text-gray-400">
                <Tag
                    v-if="dueDate"
                    icon="far fa-clock"
                    size="S"
                    :color="dueColor ?? 'gray'"
                    :label="
                        task.dueDateRelative
                            ? `${toDayMonth(dueDate)} (${task.dueDateRelative})`
                            : toDayMonth(dueDate)
                    "
                />
                <Tag
                    v-if="comments?.length"
                    icon="far fa-comments"
                    size="0"
                    :label="String(comments.length)"
                />
                <Button
                    v-if="item.url"
                    :href="item.url"
                    icon="fas fa-link"
                    target="_blank"
                    size="S"
                    color="gray"
                    text
                    @click.stop
                />
            </div>
            <div class="flex gap-2">
                <Tag
                    v-for="tag in sortedTags"
                    :key="tag.id"
                    :label="tag.name"
                    size="S"
                    :color="tag.color"
                />
            </div>
        </div>
    </div>
</template>
