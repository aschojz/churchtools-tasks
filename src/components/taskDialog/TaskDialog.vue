<script setup lang="ts">
import { CustomdataValue, usePersons } from '@churchtools/utils';
import {
    Button,
    DialogLarge,
    Input,
    InputDate,
    SelectDropdown,
    Tag,
    Textarea,
    Toggle,
} from 'churchtools-styleguide';
import { computed, onMounted, onUpdated, ref } from 'vue';
import { onBeforeRouteUpdate, useRouter } from 'vue-router';
import useTags from '../../composables/useTags';
import useTask from '../../composables/useTask';
import useTasks from '../../composables/useTasks';
import useCustommodule from '../../custommodule/useCustommodule';
import { KEY } from '../../main';
import { router } from '../../router';
import NewTask from '../NewTask.vue';
import TagDialog from '../TagDialog.vue';
import TaskItem from '../TaskItem.vue';
import Activities from './Activities.vue';

const { updateTask, taskId, tasksObject, getObjectDiff } = useTasks();
const { tagsArray } = useTags();

onMounted(() => {
    initTask();
    pathArray.value = (window.history.state.back ?? '').split('/');
});
onBeforeRouteUpdate((to) => {
    initTask(to.params.taskId);
});

onUpdated(() => {
    setTimeout(() => {
        pathArray.value = (window.history.state.back ?? '').split('/');
        showRelativeDate.value =
            (!!internTask.value?.dueDateRelative || !!parent.value) &&
            !internTask.value.dueDate;
    }, 500);
});
const pathArray = ref();
const initTask = (id?: string) => {
    internTask.value = valueById(id ?? taskId.value) ?? {};
    showRelativeDate.value =
        (!!internTask.value.dueDateRelative || !!parent.value) &&
        !internTask.value.dueDate;
    name.value = internTask.value.name;
    const personIds = internTask.value.activity?.map((a) => a.personId);
    loadPersons({ ids: personIds });
};
const name = ref('');
const internTask = ref<TransformedTask>({} as TransformedTask);

const id = computed(() => parseInt(taskId.value));
const { parent, calculateDueDate, dueColor, toDayMonth } = useTask(id);

const { deleteValue, valueById, updateValue } = useCustommodule(KEY);
const { currentRoute, push } = useRouter();

const onSave = (close: () => void) => {
    const oldTask = valueById(taskId.value);
    const diffs = getObjectDiff(internTask.value, oldTask);
    const diffObject = Object.fromEntries(
        diffs.map((key) => [
            key,
            `${oldTask[key] ?? 'Nichts'} => ${
                internTask.value[key] ?? 'Nichts'
            }`,
        ]),
    );
    updateTask(internTask.value, diffObject);
    if (showBackButton.value) {
        router.back();
    } else {
        close();
        resetRoute();
    }
};

const saveComment = (activities: ActivityEntry[]) => {
    internTask.value.activity = activities;
    updateValue(internTask.value);
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

const { loadPersons } = usePersons();

const subTasks = computed(() =>
    (internTask.value?.subTasks ?? [])
        .map((st) => tasksObject.value[st])
        .filter((st) => st),
);
const subTaskOpen = ref(false);
const onAddTask = () => {
    subTaskOpen.value = true;
};
const onSubTask = async (value: CustomdataValue) => {
    const subTasks = [...(internTask.value.subTasks ?? [])].filter((sT) =>
        valueById(String(sT)),
    );
    subTasks.push(value.id);
    const payload = {
        ...internTask.value,
        subTasks,
    };
    const oldTask = valueById(taskId.value);
    const diffs = getObjectDiff(payload, oldTask);
    const diffObject = Object.fromEntries(
        diffs.map((key) => [
            key,
            `${oldTask[key] ?? 'Nichts'} => ${payload[key] ?? 'Nichts'}`,
        ]),
    );
    await updateTask(payload, diffObject);
    internTask.value = valueById(taskId.value);
};

const showBackButton = computed(() => {
    return !isNaN(parseInt(pathArray.value[pathArray.value.length - 1]));
});

const showRelativeDate = ref(false);
</script>
<template>
    <DialogLarge
        :context="'Aufgabe bearbeiten'"
        :button="{
            disabled: !internTask.name,
            label: 'Speichern',
        }"
        style="--dialog-width: 100%"
        class="relative"
        @close="resetRoute"
        @save="(e) => onSave(e)"
    >
        <div class="absolute top-[88px]">
            <Button
                v-if="showBackButton"
                icon="fas fa-arrow-left"
                size="S"
                text
                color="gray"
                @click="$router.back()"
            >
                Zurück
            </Button>
        </div>
        <div class="flex flex-col gap-4">
            <div class="text-lg font-bold">
                {{ name }}
            </div>
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
            <div class="flex items-center justify-between">
                <div v-if="showRelativeDate" class="flex items-center gap-2">
                    <Input
                        v-model="internTask.dueDateRelative"
                        label="Fällig am"
                        type="number"
                        class="max-w-[420px]"
                        note="Tage relativ zur Oberaufgabe"
                        horizontal
                        placeholder="Anzahl Tage im Voraus"
                    />
                    <Tag
                        v-if="internTask.dueDateRelative"
                        size="S"
                        :color="dueColor"
                        :label="toDayMonth(calculateDueDate(internTask))"
                    />
                </div>
                <InputDate
                    v-else
                    v-model="internTask.dueDate"
                    horizontal
                    class="max-w-[520px]"
                    label="Fällig am"
                />
                <div v-if="parent" class="flex gap-2">
                    <span>Relatives Datum</span>
                    <Toggle
                        v-model="showRelativeDate"
                        label="Relatives Datum"
                    />
                </div>
            </div>
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
            <!-- <SelectDropdown
                v-model="internTask.assignedTo"
                multiple
                horizontal
                label="Assignee"
            /> -->
            <div class="flex gap-4">
                <div class="w-48 flex-shrink-0 font-bold">Unteraufgaben</div>
                <div class="flex-grow">
                    <div class="task_wrapper">
                        <TaskItem
                            v-for="(subtask, index) in subTasks"
                            :key="index"
                            :item="subtask"
                            :show-task="true"
                        />
                        <NewTask
                            v-if="subTaskOpen"
                            :list="{ id: internTask.list }"
                            @close="subTaskOpen = false"
                            @created="onSubTask"
                        />
                        <div>
                            <button
                                :class="{ 'rounded-t': !subTasks.length }"
                                class="flex w-full items-center gap-3 rounded-b border bg-white px-4 py-3 font-bold text-gray-500"
                                @click="onAddTask"
                            >
                                <i class="fas fa-plus"></i>
                                Unteraufgabe hinzufügen
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="my-6 border-b"></div>
            <Activities
                v-if="internTask.activity"
                :activities="internTask.activity"
                @comment="saveComment"
            />
        </div>
        <TagDialog v-if="createTagIsOpen" @close="createTagIsOpen = false" />
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
<style>
.task_wrapper > div:first-child {
    @apply rounded-t border-gray-200;
}
.task_wrapper > div:last-child {
    @apply rounded-b border-b border-gray-200;
}
.task_wrapper > div {
    box-shadow: none;
    border-radius: 0;
    @apply border-b-0 border-gray-200;
}
</style>
