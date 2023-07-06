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
import gql from 'graphql-tag';
import { useLazyQuery } from '@vue/apollo-composable';

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
    })),
);

const { createProject, updateProject } = useProjects();
const onSave = (close: () => void) => {
    (props.project.id ? updateProject : createProject)(proj.value);
    close();
};

const CHARACTERS_QUERY = gql`
    query getIcons($query: String!) {
        search(version: "6.x", query: $query) {
            id
            label
            familyStylesByLicense {
                free {
                    family
                    style
                }
            }
        }
    }
`;
const { load, variables, result } = useLazyQuery(CHARACTERS_QUERY, {
    query: '',
});
const onSearchForIcon = (query: string) => {
    variables.value = { query };
    load();
    return Promise.resolve();
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
            <SelectDropdown
                v-model="proj.icon"
                label="Icon"
                :options="
                    (result?.search ?? [])
                        .filter(
                            (s) =>
                                s.familyStylesByLicense.free.filter(
                                    (i) => i.style === 'solid',
                                ).length,
                        )
                        .map((s) => ({
                            id: `fas fa-${s.id}`,
                            label: s.label,
                            icon: `fas fa-${s.id}`,
                        }))
                "
                note="Nach englischen Bezeichnungen suchen"
                emit-id
                :search-function="onSearchForIcon"
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
