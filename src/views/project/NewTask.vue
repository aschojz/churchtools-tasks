<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Button, Input } from 'churchtools-styleguide';
import useTasks from '../../composables/useTasks';

const props = defineProps<{
    list: TransformedList;
}>();
const emit = defineEmits<{
    (event: 'close'): void;
}>();

const { createTask } = useTasks();

const inputRef = ref();
onMounted(() => {
    inputRef.value.focus();
});

const task = ref({ list: props.list.id } as Task);
const onCreateTask = () => {
    createTask({ ...task.value });
    resetTask();
};
const resetTask = () => {
    task.value = {} as TransformedTask;
    emit('close');
};
</script>
<template>
    <div
        class="bg-white rounded border flex flex-col gap-2 border-gray-100 shadow-sm justify-between p-3 cursor-pointer transition-colors hover:border-gray-200"
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
