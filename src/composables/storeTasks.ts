import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';

export const taskStore = defineStore('tasks', () => {
    const showSubTasks = ref(false),
        showFullfilled = ref(true),
        sortBy = ref('dueDate'),
        search = ref('');

    const unsortedList = reactive({
        id: 0,
        name: 'Unsortiert',
        sortKey: 0,
        type: 'list',
        isCollapsed: false,
    });

    return { showSubTasks, showFullfilled, sortBy, unsortedList, search };
});
