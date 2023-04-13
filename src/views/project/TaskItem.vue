<script setup lang="ts">
import { Button, DomainObject, Tag } from 'churchtools-styleguide';
import { sortBy } from 'lodash-es';
import { computed } from 'vue';
import useCustommodule from '../../custommodule/useCustommodule';
import { KEY } from '../../main';
import { useRouter } from 'vue-router';
import { usePersons } from '@churchtools/utils';
import useTags from '../../composables/useTags';
const props = defineProps<{
    item: TransformedTask;
}>();

const toDayMonth = (date: string) => {
    return new Date(date).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
    });
};

const router = useRouter();
const openTask = () => {
    router.push({ name: 'project-board', params: { taskId: props.item.id } });
};

const dueColor = computed(() => {
    if (!props.item.dueDate) {
        return;
    }
    const dueDate = new Date(props.item.dueDate);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    if (dueDate < now) {
        return 'red';
    }
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const diff = dueDate.getTime() - now.getTime();

    const nextDay = 1;
    if (diff < millisecondsPerDay * nextDay) {
        return 'green';
    }
    return 'gray';
});

const { updateValue } = useCustommodule(KEY);
const onToggleTask = () => {
    const payload = { ...props.item, fullfilled: !props.item.fullfilled };
    updateValue(payload);
};

const showLastRow = computed(
    () =>
        props.item.dueDate ||
        props.item.comments?.length ||
        props.item.tags?.length
);

// const { personById } = usePersons();
const assignees = computed(
    () => props.item.assignedTo
    // ?.map((id) => {
    //     const p = personById(id);
    //     return {
    //         ...p,
    //         title: [p.firstName, p.lastName].filter((t) => !!t).join(' '),
    //     };
    // })
    // .filter((p) => p.title)
);

const { tags } = useTags();
const sortedTags = computed(() => {
    const tt = props.item.tags?.map(
        (t) => tags.value[t] ?? { id: t, name: t, color: 'orange' }
    );
    return sortBy(tt, 'name');
});
</script>
<template>
    <div
        class="bg-white rounded border flex flex-col gap-2 border-gray-100 shadow-sm justify-between p-3 cursor-pointer transition-colors hover:border-gray-200"
        @click="openTask"
    >
        <div class="flex gap-4 items-start justify-end">
            <div class="flex gap-2 items-start flex-grow">
                <i
                    v-if="item.fullfilled"
                    class="far fa-check-square text-green-500 text-[20px]"
                    @click.stop="onToggleTask"
                ></i>
                <i
                    v-else
                    class="far fa-square text-gray-500 text-[20px]"
                    @click.stop="onToggleTask"
                ></i>
                <span class="font-bold"> {{ item.name }} </span>
            </div>
            <div
                v-if="item.assignedTo?.length"
                class="flex-shrink-0 flex gap-1"
            >
                <!-- <DomainObject
                    v-for="assignee in assignees"
                    :key="assignee.id"
                    :domain-object="assignee"
                    size="XS"
                /> -->
            </div>
        </div>
        <div v-if="item.description" class="line-clamp-1 l">
            {{ item.description }}
        </div>
        <div v-if="showLastRow" class="flex justify-end gap-2 flex-wrap">
            <div class="text-gray-400 flex items-center gap-3 flex-grow">
                <Tag
                    v-if="item.dueDate"
                    icon="far fa-clock"
                    size="S"
                    :color="dueColor"
                    :label="toDayMonth(item.dueDate)"
                />
                <Tag
                    v-if="item.comments?.length"
                    icon="far fa-comments"
                    size="0"
                    :label="item.comments?.length"
                />
                <Button
                    v-if="item.url"
                    :href="item.url"
                    icon="fas fa-link"
                    target="_blank"
                    size="S"
                    color="gray"
                    text
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
