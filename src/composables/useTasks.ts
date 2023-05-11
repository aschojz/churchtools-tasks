import { computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { KEY } from '../main';
import { useMain, usePersons } from '@churchtools/utils';
import useProjects from './useProjects';
import { isEqual } from 'lodash';
import { taskStore } from './storeTasks';
import useCustommodule from '../custommodule/useCustommodule';

export default function useTasks() {
    const { currentRoute } = useRouter();
    const { loadPersons } = usePersons();
    const { currentUser } = useMain();
    const { valuesByCategory, valueStore, createValue, updateValue } =
        useCustommodule(KEY);
    const { projectId } = useProjects();
    const store = taskStore();

    const taskId = computed(() => {
        const id = Array.isArray(currentRoute.value.params.taskId)
            ? currentRoute.value.params.taskId[0]
            : currentRoute.value.params.taskId;
        return id;
    });
    const values = computed(
        () => valuesByCategory.value[projectId.value] ?? []
    );

    const tasks = computed<TransformedTask[]>(() => {
        const tasks = values.value.filter(
            (v: TransformedTask | TransformedList) => v.type === 'task'
        );
        return tasks.map((task) => ({
            ...task,
            parent: tasks.find((t) => t.subTasks?.includes(task.id))?.id,
        }));
    });
    const tasksObject = computed(() => {
        return Object.fromEntries(tasks.value.map((t) => [t.id, t]));
    });
    const lists = computed(() => {
        const li: TransformedList[] = values.value.filter(
            (v: TransformedTask | TransformedList) => v.type === 'list'
        );
        return li;
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

    const createTask = async (newTask: Task) => {
        return await createValue({
            ...newTask,
            activity: [
                {
                    personId: currentUser.value.id,
                    date: new Date().toISOString(),
                    type: 'create',
                },
            ],
            dataCategoryId: projectId.value,
            type: 'task',
        });
    };

    const updateTask = async (
        task: TransformedTask,
        diff: Partial<TransformedTask> = {}
    ) => {
        const activity = task.activity;
        activity?.push({
            personId: currentUser.value.id,
            date: new Date().toISOString(),
            type: 'update',
            value: diff,
        });
        const payload = {
            ...task,
            type: 'task',
            dataCategoryId: projectId.value,
        };
        await updateValue(payload);
    };

    const getObjectDiff = (
        obj1: Record<string, unknown>,
        obj2: Record<string, unknown>,
        compareRef = false
    ) => {
        return Object.keys(obj1).reduce((result, key) => {
            if (!Object.prototype.hasOwnProperty.call(obj2, key)) {
                result.push(key);
            } else if (isEqual(obj1[key], obj2[key])) {
                const resultKeyIndex = result.indexOf(key);

                if (compareRef && obj1[key] !== obj2[key]) {
                    result[resultKeyIndex] = `${key} (ref)`;
                } else {
                    result.splice(resultKeyIndex, 1);
                }
            }
            return result;
        }, Object.keys(obj2));
    };

    const showTask = (task: TransformedTask) => {
        return (
            ((!store.showFullfilled && !task.fullfilled) ||
                store.showFullfilled) &&
            ((!store.showSubTasks && !task.parent) || store.showSubTasks)
        );
    };

    const findParent = (t: TransformedTask) =>
        tasks.value.find((task) => task.subTasks?.includes(t?.id));

    const calculateDueDate = (t: TransformedTask) => {
        if (t?.dueDate) {
            return t.dueDate;
        }
        const parent = findParent(t);
        if (t && parent) {
            const { relative, date } = getCombinedDueDates(
                t,
                t.dueDateRelative ?? 0
            );
            if (date && t.dueDateRelative !== undefined) {
                const d = new Date(date);
                d.setDate(d.getDate() - relative);
                return d.toISOString();
            }
        }
        return undefined;
    };

    const getCombinedDueDates = (
        t: TransformedTask,
        days: number
    ): { relative: number; date?: string } => {
        let d = days,
            dueDate: undefined | string = undefined;
        const parent = findParent(t);
        if (parent?.dueDateRelative) {
            d += +parent.dueDateRelative;
        }
        dueDate = parent?.dueDate;
        if (parent && findParent(parent)) {
            const { date, relative } = getCombinedDueDates(parent, d);
            d = relative;
            dueDate = date;
        }
        return { relative: d, date: dueDate };
    };

    return {
        projectId,
        taskId,
        tasksObject,
        values,
        tasks,
        lists,
        taskIsOpen,
        showTask,
        createTask,
        updateTask,
        getObjectDiff,
        calculateDueDate,
        findParent,
    };
}
