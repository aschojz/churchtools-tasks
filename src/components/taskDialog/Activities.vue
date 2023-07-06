<script setup lang="ts">
import { useDate, useMain, usePersons } from '@churchtools/utils';
import { Button, DomainObject, Textarea } from 'churchtools-styleguide';
import { sortBy } from 'lodash';
import { computed, ref } from 'vue';

const props = withDefaults(
    defineProps<{
        activities: ActivityEntry[];
    }>(),
    { activities: () => [] },
);
const emit = defineEmits<{
    (event: 'comment', payload: ActivityEntry[]): void;
}>();

const { dateToStringLocale } = useDate();
const { personStore } = usePersons();

const transformedActivities = computed(() => {
    const array = props.activities.map((e) => {
        const person = personStore.persons[e.personId];
        return {
            ...e,
            dateDisplay: dateToStringLocale(new Date(e.date), true),
            person: {
                ...person,
                domainType: 'person',
                title: [person?.firstName, person?.lastName].join(' '),
            },
        };
    });
    return sortBy(array, 'date').reverse();
});

const { currentUser } = useMain();
const newComment = ref('');
const onComment = () => {
    const activity = [...props.activities];
    activity.push({
        personId: currentUser.value.id,
        date: new Date().toISOString(),
        type: 'comment',
        value: newComment.value,
    });
    emit('comment', activity);
    newComment.value = '';
};
const onCancelComment = () => {
    newComment.value = '';
};
</script>
<template>
    <div class="flex gap-4">
        <div class="w-48 font-bold">Aktivität</div>
        <div class="flex flex-grow flex-col gap-3">
            <div class="group flex flex-col gap-2">
                <Textarea
                    v-model="newComment"
                    placeholder="Kommentar hinzufügen"
                    @keydown.enter.meta.stop="onComment"
                    @keydown.escape.stop="onCancelComment"
                />
                <div class="hidden justify-end gap-2 group-focus-within:flex">
                    <Button size="S" outlined @click="onCancelComment"
                        >Abbrechen</Button
                    >
                    <Button size="S" @click="onComment"> Kommentieren </Button>
                </div>
            </div>
            <div v-for="(entry, index) in transformedActivities" :key="index">
                <div
                    v-if="entry.type === 'comment'"
                    class="flex flex-col items-end"
                >
                    <div
                        class="flex w-full flex-grow flex-col gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2"
                    >
                        <div class="text-ter flex items-center gap-2">
                            <DomainObject
                                :domain-object="entry.person"
                                size="XS"
                            />
                            <span class="text-sec font-bold">
                                {{ entry.person?.title }}
                            </span>
                            <span>·</span>
                            <div>{{ entry.dateDisplay }}</div>
                        </div>
                        <div class="whitespace-pre">
                            {{ entry.value }}
                        </div>
                    </div>
                </div>
                <div
                    v-else-if="entry.type === 'fullfilled'"
                    class="text-sec flex items-baseline gap-1 text-xs"
                >
                    <span class="font-bold">
                        {{ entry.person?.title }}
                    </span>
                    <span>
                        {{ entry.value ? 'checked' : 'unchecked' }}
                        die Aufgabe
                    </span>
                    <span class="text-ter"> am {{ entry.dateDisplay }} </span>
                </div>
                <div
                    v-else-if="entry.type === 'create'"
                    class="text-sec flex items-baseline gap-1 text-xs"
                >
                    <span class="font-bold">
                        {{ entry.person?.title }}
                    </span>
                    <span> erstellte die Aufgabe </span>
                    <span class="text-ter"> am {{ entry.dateDisplay }} </span>
                </div>
                <div
                    v-else
                    class="text-ter flex flex-wrap items-baseline gap-x-2 text-xs"
                >
                    <span class="font-bold">
                        {{ entry.person?.title }}
                    </span>
                    <span
                        >{{ entry.type }}:
                        {{
                            Object.entries(entry.value)
                                .map(([key, value]) => `${key}: ${value}`)
                                .join(', ')
                        }}</span
                    >
                    <span class="text-ter">
                        {{ entry.dateDisplay }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
