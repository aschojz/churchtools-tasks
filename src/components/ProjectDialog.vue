<script setup lang="ts">
import { useColors } from '@churchtools/utils';
import {
    DialogLarge,
    Input,
    SelectDropdown,
    Textarea,
} from 'churchtools-styleguide';
import { computed, ref } from 'vue';
import useProjects from '../composables/useProjects';

const props = defineProps<{
    project: Project;
}>();
const emit = defineEmits<{
    (event: 'close'): void;
}>();

const proj = ref(props.project);

const { ctColors } = useColors();
const colors = computed(() =>
    ctColors.map((c) => ({
        id: c.key,
        label: c.key,
        color: c,
        icon: 'fas fa-circle',
    }))
);

const { createProject, updateProject } = useProjects();
const onSave = (close: () => void) => {
    (props.project.id ? updateProject : createProject)(proj.value);
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
            <Input v-model="proj.name" label="Name" />
            <Textarea v-model="proj.description" label="Beschreibung" />
            <Input
                v-model="proj.icon"
                label="Icon"
                note="Eine FontAwesome Klasse z.B. fas fa-user"
            />
            <SelectDropdown
                v-model="proj.color"
                :options="colors"
                emit-id
                label="Farbe"
            />
        </div>
    </DialogLarge>
</template>
