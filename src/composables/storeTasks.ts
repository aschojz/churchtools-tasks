import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';

export const taskStore = defineStore('tasks', () => {
    const showSubTasks = ref(false),
        showFullfilled = ref(true),
        sortBy = ref('dueDate'),
        search = ref('');

    const isCreatingDefaultList = ref(false);

    return { showSubTasks, showFullfilled, sortBy, isCreatingDefaultList, search };
});
