<script setup lang="ts">
import { Tag } from 'churchtools-styleguide';
import { ref, computed } from 'vue';
import useCustommodule from '../../custommodule/useCustommodule';
import { KEY } from '../../main';
import TaskDialog from './TaskDialog.vue';
const props = defineProps<{
    item: TransformedTask;
}>();

const toDayMonth = (date: string) => {
    return new Date(date).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
    });
};

const isOpen = ref(false);

const dueColor = computed(() => {
    if (!props.item.dueDate) {
        return;
    }
    const dueDate = new Date(props.item.dueDate);
    const now = new Date();
    if (dueDate < now) {
        return 'red';
    }
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const diff = dueDate.getTime() - now.getTime();

    const nextDay = 1;
    if (diff < millisecondsPerDay * nextDay) {
        return 'orange';
    }
    const nextDays = 7;
    if (diff < millisecondsPerDay * nextDays) {
        return 'yellow';
    }
    return 'gray';
});

const { updateValue } = useCustommodule(KEY);
const onToggleTask = () => {
    const payload = { ...props.item, fullfilled: !props.item.fullfilled };
    updateValue(payload);
};
</script>
<template>
    <div
        class="bg-white rounded border border-gray-100 shadow-sm flex justify-between p-3 cursor-pointer transition-colors hover:border-gray-200"
        @click="isOpen = !isOpen"
    >
        <div class="flex flex-col gap-2">
            <div class="flex gap-2 items-center">
                <i
                    v-if="item.fullfilled"
                    class="far fa-check-square text-green-500 text-lg"
                    @click.stop="onToggleTask"
                ></i>
                <i
                    v-else
                    class="far fa-square text-lg text-gray-500"
                    @click.stop="onToggleTask"
                ></i>
                <span class="font-bold"> {{ item.name }} </span>
            </div>
            <div
                v-if="item.dueDate || item.description || item.comments?.length"
                class="text-gray-400 flex items-center gap-3"
            >
                <Tag
                    v-if="item.dueDate"
                    icon="far fa-clock"
                    size="S"
                    :color="dueColor"
                    :label="toDayMonth(item.dueDate)"
                />
                <i v-if="item.description" class="fas fa-align-left"></i>
                <Tag
                    v-if="item.comments?.length"
                    icon="far fa-comments"
                    size="0"
                    :label="item.comments?.length"
                />
            </div>
        </div>
        <div class="text-right text-gray-400">
            <div class="flex gap-2">
                <Tag
                    v-for="(tag, index) in item.tags"
                    :key="index"
                    :label="tag"
                    size="S"
                    color="orange"
                />
            </div>
        </div>
        <TaskDialog
            v-if="isOpen"
            :task="item"
            @close="isOpen = false"
        ></TaskDialog>
    </div>
</template>
