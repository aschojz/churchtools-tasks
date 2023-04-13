<script setup lang="ts">
import {
    Input,
    Button,
    InputDate,
    SelectDropdown,
    Textarea,
    DialogLarge,
} from 'churchtools-styleguide';
import { computed, onMounted, ref } from 'vue';
import useCustommodule from '../../custommodule/useCustommodule';
import { useRouter } from 'vue-router';
import { KEY } from '../../main';
import useTasks from '../../composables/useTasks';
import useTags from '../../composables/useTags';
import TagDialog from './TagDialog.vue';
import { useDate } from '@churchtools/utils';

const { updateTask, taskId } = useTasks();
const { tagsArray } = useTags();

onMounted(() => {
    internTask.value = valueById(taskId.value);
    name.value = internTask.value.name;
});
const name = ref('');
const internTask = ref<TransformedTask>({} as TransformedTask);

const { deleteValue, valueById } = useCustommodule(KEY);
const { currentRoute, push } = useRouter();

const onSave = (close: () => void) => {
    updateTask(internTask.value);
    close();
    resetRoute();
};

const onDelete = (close: () => void) => {
    deleteValue(internTask.value.id);
    close();
    resetRoute();
};
const resetRoute = () => {
    push({ ...currentRoute.value, params: {} });
};

const createTagIsOpen = ref(false);

const { dateToStringLocale } = useDate();
const meta = computed(() => {
    return {
        createdBy: internTask.value.createdBy,
        createdDate: dateToStringLocale(
            new Date(internTask.value.createdDate),
            true
        ),
        modifiedBy: internTask.value.modifiedBy,
        modifiedDate: dateToStringLocale(
            new Date(internTask.value.modifiedDate),
            true
        ),
    };
});
</script>
<template>
    <DialogLarge
        :context="'Aufgabe bearbeiten'"
        :button="{
            disabled: !internTask.name,
            label: 'Speichern',
        }"
        @close="resetRoute"
        @save="(e) => onSave(e)"
    >
        <div class="text-lg font-bold">
            {{ name }}
        </div>
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
                horizontal
                :rows="10"
            />
            <InputDate
                v-model="internTask.dueDate"
                horizontal
                class="max-w-[520px]"
                label="Fällig am"
            />
            <Input v-model="internTask.url" label="Link" horizontal />
            <div class="flex gap-2">
                <SelectDropdown
                    v-model="internTask.tags"
                    horizontal
                    emit-id
                    multiple
                    class="flex-grow"
                    label="Tags"
                    :options="tagsArray"
                />
                <Button
                    icon="fas fa-plus"
                    outlined
                    @click="createTagIsOpen = true"
                />
            </div>
            <SelectDropdown
                v-model="internTask.assignedTo"
                multiple
                horizontal
                label="Assignee"
            />
            <div>
                <div>Unteraufgaben</div>
            </div>
            <div class="flex gap-4">
                <div class="w-48"></div>
                <div class="text-ter text-xs">
                    Zuletzt bearbeitet von {{ meta.modifiedBy }} am
                    {{ meta.modifiedDate }} — Erstellt von
                    {{ meta.createdBy }} am
                    {{ meta.createdDate }}
                </div>
            </div>
        </div>
        <TagDialog v-if="createTagIsOpen" />
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
