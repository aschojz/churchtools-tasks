<script setup lang="ts">
import {
    Input,
    DialogLarge,
    Textarea,
    SelectDropdown,
} from 'churchtools-styleguide';
import { ref, computed } from 'vue';
import useProjects from '../composables/useProjects';
import { useColors } from '@churchtools/utils';

const props = defineProps<{
    project: Project;
}>();
const emit = defineEmits<{
    (event: 'close'): void;
}>();

const project = ref(props.project);

const { ctColors } = useColors();
const colors = computed(() =>
    ctColors.map((c) => ({
        id: c.key,
        name: c.key,
        color: c,
        icon: 'fas fa-circle',
    }))
);

const { createProject, updateProject } = useProjects();
const onSave = (close: () => void) => {
    (props.project.id ? updateProject : createProject)(project.value);
    close();
};
</script>
<template>
    <DialogLarge
        context="Neues Projekt anlegen"
        @save="onSave"
        @close="emit('close')"
    >
        <div class="flex flex-col gap-4">
            <Input v-model="project.name" label="Name" />
            <Textarea v-model="project.description" label="Beschreibung" />
            <Input v-model="project.icon" label="Icon" />
            <SelectDropdown
                v-model="project.color"
                :options="colors"
                emit-id
                label="Farbe"
            />
        </div>
    </DialogLarge>
</template>
