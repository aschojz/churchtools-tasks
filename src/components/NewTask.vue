<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Button, Input } from 'churchtools-styleguide';
import useTasks from '../composables/useTasks';
import { CustomdataValue } from '@churchtools/utils';

const props = defineProps<{
    list: TransformedList;
}>();
const emit = defineEmits<{
    (event: 'close'): void;
    (event: 'created', value: CustomdataValue): void;
}>();

const { createTask } = useTasks();

const inputRef = ref();
onMounted(() => {
    inputRef.value.focus();
});

const task = ref({ list: props.list.id } as Task);
const onCreateTask = async () => {
    const newTask = await createTask({ ...task.value });
    if (newTask) {
        emit('created', newTask);
        resetTask();
    }
};
const resetTask = () => {
    task.value = {} as TransformedTask;
    emit('close');
};
</script>
<template>
    <div
        class="flex cursor-pointer flex-col justify-between gap-2 rounded border border-gray-100 bg-white p-3 shadow-sm transition-colors hover:border-gray-200"
        @keydown.escape="resetTask"
    >
        <Input
            ref="inputRef"
            v-model="task.name"
            label="Titel"
            @enter="onCreateTask"
        />
        <div class="flex justify-between">
            <Button size="S" color="gray" outlined @click="resetTask">
                Abbrechen
            </Button>
            <Button size="S" :disabled="!task.name" @click="onCreateTask">
                Erstellen
            </Button>
        </div>
    </div>
</template>
