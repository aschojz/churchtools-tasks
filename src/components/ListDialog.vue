<script setup lang="ts">
import { DialogLarge, Input } from 'churchtools-styleguide';
import { computed, ref } from 'vue';
import useTasks from '../composables/useTasks';
import useCustommodule from '../custommodule/useCustommodule';
import { KEY } from '../main';

const props = withDefaults(
    defineProps<{
        list: Project;
    }>(),
    { list: () => ({}) }
);
const emit = defineEmits<{
    (event: 'close'): void;
}>();

const internalList = ref(props.list);

const { createValue, updateValue } = useCustommodule(KEY);
const { projectId } = useTasks();
const createList = () => {
    const i = Math.floor(Math.random() * 100);
    const list: TaskList = {
        type: 'list',
        name: internalList.value.name,
        sortKey: i,
        isCollapsed: false,
    };
    createValue({
        dataCategoryId: projectId.value,
        ...list,
    });
};

const updateList = () => {
    updateValue({
        dataCategoryId: projectId.value,
        ...internalList.value,
    });
};
const onSave = (close: () => void) => {
    (props.list.id ? updateList : createList)();
    close();
};
const context = computed(() => {
    return props.list.id ? 'Liste bearbeiten' : 'Neue Liste anlegen';
});
</script>
<template>
    <DialogLarge :context="context" @save="onSave" @close="emit('close')">
        <div class="flex flex-col gap-4">
            <Input v-model="internalList.name" label="Name" />
        </div>
    </DialogLarge>
</template>
