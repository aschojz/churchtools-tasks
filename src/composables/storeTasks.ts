import { defineStore } from 'pinia';
import { ref } from 'vue';

export const taskStore = defineStore('tasks', () => {
    const showSubTasks = ref(false),
        showFullfilled = ref(false),
        sortBy = ref('dueDate');
    return { showSubTasks, showFullfilled, sortBy };
});
