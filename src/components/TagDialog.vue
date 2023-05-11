<script setup lang="ts">
import { Input, DialogSmall, SelectDropdown } from 'churchtools-styleguide';
import { useColors } from '@churchtools/utils';
import { computed, ref } from 'vue';
import useTags from '../composables/useTags';

const { ctColors } = useColors();

const emit = defineEmits<{
    (event: 'close'): void;
}>();

const colors = computed(() =>
    ctColors.map((c) => ({
        id: c.key,
        name: c.key,
        color: c,
        icon: 'fas fa-circle',
    }))
);
const { createTag } = useTags();
const tag = ref({} as Tag);
const onSave = (close: () => void) => {
    createTag(tag.value);
    close();
};
</script>
<template>
    <DialogSmall
        title="Neuen Tag anlegen"
        @close="emit('close')"
        @save="onSave"
    >
        <div class="flex flex-col gap-4">
            <Input v-model="tag.name" label="Name" />
            <SelectDropdown
                v-model="tag.color"
                label="Farbe"
                :options="colors"
                :clear="false"
                emit-id
                class="max-w-[320px]"
            />
        </div>
    </DialogSmall>
</template>
