<script setup lang="ts">
import DialogLarge from '../../components/DialogLarge.vue';
import {
    ctsCheckbox,
    Input,
    Button,
    InputDate,
    SelectDropdown,
    Textarea,
} from 'churchtools-styleguide';
import { ref } from 'vue';
import useCustommodule from '../../custommodule/useCustommodule';
import { useRouter } from 'vue-router';
import { KEY } from '../../main';

const props = defineProps<{
    task: TransformedTask;
    create?: boolean;
}>();
const emit = defineEmits<{
    (event: 'save', task: TransformedTask): void;
    (event: 'close'): void;
}>();

const internTask = ref({ ...props.task });

const { updateValue, deleteValue, createValue } = useCustommodule(KEY);
const { currentRoute } = useRouter();

const onSave = (close: () => void) => {
    const projectId = Array.isArray(currentRoute.value.params.projectId)
        ? currentRoute.value.params.projectId[0]
        : currentRoute.value.params.projectId;
    const payload = {
        ...internTask.value,
        type: 'task',
        dataCategoryId: parseInt(projectId),
    };
    (props.create ? createValue : updateValue)(payload);
    close();
    emit('save', internTask.value);
};

const onDelete = (close: () => void) => {
    deleteValue(internTask.value.id);
    close();
    emit('close');
};
</script>
<template>
    <DialogLarge
        :context="create ? 'Aufgabe erstellen' : 'Aufgabe bearbeiten'"
        :button="{
            disabled: !internTask.name,
            label: create ? 'Erstellen' : 'Speichern',
        }"
        @close="emit('close')"
        @save="(e) => onSave(e)"
    >
        <div v-if="!create" class="text-lg font-bold">{{ task.name }}</div>
        <div class="flex flex-col gap-4">
            <Input
                v-model="internTask.name"
                label="Titel"
                required
                horizontal
            />
            <Textarea
                v-model="internTask.description"
                label="Beschreibung"
                :rows="10"
            />
            <InputDate v-model="internTask.dueDate" label="Fällig am" />
            <ctsCheckbox v-model="internTask.allDay" label="ganztägig" />
            <Input v-model="internTask.url" label="Link" horizontal />
            <SelectDropdown v-model="internTask.tags" multiple label="Tags" />
            <SelectDropdown
                v-model="internTask.assignedTo"
                multiple
                label="Assignee"
            />
            <div>
                <div>Unteraufgaben</div>
            </div>
        </div>
        <template #footer-left="{ close }">
            <Button
                outlined
                color="red"
                icon="fas fa-trash-alt"
                @click="onDelete(close)"
                >Löschen</Button
            >
        </template>
    </DialogLarge>
</template>
