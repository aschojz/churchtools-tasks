<script setup lang="ts">
import { DialogLarge, Input } from 'churchtools-styleguide';
import { computed, ref } from 'vue';
import useLists from '../composables/useLists';

const props = withDefaults(
    defineProps<{
        list: TaskList | TransformedList;
    }>(),
    { list: () => ({}) as TaskList },
);
const emit = defineEmits<{
    (event: 'close'): void;
}>();

const internalList = ref(props.list);

const { updateList, createList } = useLists();

const isTransformedList = (
    list: TaskList | TransformedList,
): list is TransformedList => {
    return 'sortKey' in list;
};

const onSave = (close: () => void) => {
    isTransformedList(internalList.value)
        ? updateList(internalList.value)
        : createList(internalList.value);
    close();
};
const context = computed(() => {
    return isTransformedList(internalList.value)
        ? 'Liste bearbeiten'
        : 'Neue Liste anlegen';
});
</script>
<template>
    <DialogLarge :context="context" @save="onSave" @close="emit('close')">
        <div class="flex flex-col gap-4">
            <Input v-model="internalList.name" label="Name" />
            <Input v-model="internalList.sortKey" label="Sortierung" />
        </div>
    </DialogLarge>
</template>
