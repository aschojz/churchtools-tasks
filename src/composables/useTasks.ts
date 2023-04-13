import { computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import useCustommodule from '../custommodule/useCustommodule';
import { KEY } from '../main';
import { useMain, usePersons } from '@churchtools/utils';
import useProjects from './useProjects';

export default function useTasks() {
    const { currentRoute } = useRouter();
    const { loadPersons } = usePersons();
    const { currentUser } = useMain();
    const { valuesByCategory, valueStore, createValue, updateValue } =
        useCustommodule(KEY);
    const { projectId } = useProjects();

    const taskId = computed(() => {
        const id = Array.isArray(currentRoute.value.params.taskId)
            ? currentRoute.value.params.taskId[0]
            : currentRoute.value.params.taskId;
        return id;
    });
    const values = computed(
        () => valuesByCategory.value[projectId.value] ?? []
    );

    const tasks = computed<TransformedTask[]>(() =>
        values.value.filter(
            (v: TransformedTask | TransformedList) => v.type === 'task'
        )
    );
    const lists = computed(() => {
        const li: TransformedList[] = values.value.filter(
            (v: TransformedTask | TransformedList) => v.type === 'list'
        );
        return li;
    });

    const tasksByList = computed(() => {
        const items: Record<number, TransformedTask[]> = {};
        tasks.value.forEach((task) => {
            items[task.list ?? 0] ??= [];
            items[task.list ?? 0].push(task);
        });
        return items;
    });

    const assignedIds = computed(() => {
        const ids = new Set<number>();
        tasks.value.forEach((task) => {
            if (task.assignedTo?.length) {
                task.assignedTo.forEach((id) => ids.add(id));
            }
        });
        return Array.from(ids);
    });
    watch(
        () => assignedIds.value,
        () => {
            loadPersons({ ids: assignedIds.value });
        }
    );

    const taskIsOpen = computed(() => {
        const taskId = currentRoute.value.params.taskId;
        const id = Array.isArray(taskId) ? taskId[0] : taskId;
        return id && valueStore.loadingState === 'SUCCESS';
    });

    const createTask = (newTask: Task) => {
        createValue({
            ...newTask,
            createdBy: currentUser.value.id,
            createdDate: new Date().toISOString(),
            modifiedBy: currentUser.value.id,
            modifiedDate: new Date().toISOString(),
            dataCategoryId: projectId.value,
            type: 'task',
        });
    };

    const updateTask = (task: TransformedTask) => {
        const payload = {
            ...task,
            modifiedBy: currentUser.value.id,
            modifiedDate: new Date().toISOString(),
            type: 'task',
            dataCategoryId: projectId.value,
        };
        updateValue(payload);
    };

    return {
        projectId,
        taskId,
        values,
        tasks,
        lists,
        tasksByList,
        taskIsOpen,
        createTask,
        updateTask,
    };
}
