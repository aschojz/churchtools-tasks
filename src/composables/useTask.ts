import { ComputedRef, Ref, computed } from 'vue';
import useProjects from './useProjects';
import useTasks from './useTasks';
import { usePersons, useMain } from '@churchtools/utils';
import useTags from './useTags';
import { sortBy } from 'lodash';
import { KEY } from '../main';
import useCustommodule from '../custommodule/useCustommodule';

export default function useTask(taskId: ComputedRef<number> | Ref<number>) {
    const { tasksObject, findParent, calculateDueDate } = useTasks();
    const { projectId } = useProjects();

    const task = computed(() => {
        return tasksObject.value[taskId.value] ?? {};
    });

    const percentFullfilled = computed(() => {
        const all = task.value.subTasks?.length ?? 0;
        const fullfilled = (task.value.subTasks ?? [])
            ?.map((st) => tasksObject.value[st])
            .filter((st) => st?.fullfilled);
        return Math.floor((fullfilled.length / all) * 100);
    });

    const parent = computed(() => {
        const parent = findParent(task.value);
        if (parent) {
            parent.dueDate = calculateDueDate(parent);
        }
        return parent;
    });

    const hasSubTasks = computed(
        () =>
            !!(task.value?.subTasks ?? [])
                .map((st) => tasksObject.value[st])
                .filter((st) => st).length
    );

    const { personStore } = usePersons();
    const assignees = computed(() =>
        (task.value?.assignedTo ?? [])
            ?.map((id) => {
                const p = personStore.persons[id];
                if (p) {
                    return {
                        ...p,
                        domainType: 'person',
                        title: [p.firstName, p.lastName]
                            .filter((t) => !!t)
                            .join(' '),
                    };
                }
                return { title: '' };
            })
            .filter((p) => p.title)
    );

    const { tags } = useTags();
    const sortedTags = computed(() => {
        const tt = (task.value?.tags ?? [])
            ?.map((t) => tags.value[t])
            .filter((t) => !!t);
        return sortBy(tt, 'name');
    });

    const { currentUser } = useMain();
    const { updateValue, deleteValue } = useCustommodule(KEY);
    const toggleTask = () => {
        const activity = task.value?.activity ?? [];
        activity.push({
            personId: currentUser.value.id,
            date: new Date().toISOString(),
            type: 'fullfilled',
            value: !task.value.fullfilled,
        });
        const payload = {
            ...task.value,
            fullfilled: !task.value.fullfilled,
            activity,
        };
        updateValue(payload);
    };
    const deleteTask = () => deleteValue(taskId.value);

    const comments = computed(() =>
        (task.value?.activity ?? [])?.filter((a) => a.type === 'comment')
    );

    const dueDate = computed(() => calculateDueDate(task.value));
    const dueColor = computed(() => {
        if (!dueDate.value) {
            return;
        }
        const dd = new Date(dueDate.value);
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        if (dd < now) {
            return 'red';
        }
        const millisecondsPerDay = 1000 * 60 * 60 * 24;
        const diff = dd.getTime() - now.getTime();

        const nextDay = 1;
        if (diff < millisecondsPerDay * nextDay) {
            return 'green';
        }
        return 'gray';
    });

    const toDayMonth = (date: string) => {
        return new Date(date).toLocaleDateString('de-DE', {
            month: 'short',
            day: 'numeric',
        });
    };

    return {
        projectId,
        task,
        assignees,
        sortedTags,
        dueColor,
        dueDate,
        comments,
        parent,
        hasSubTasks,
        toggleTask,
        deleteTask,
        toDayMonth,
        calculateDueDate,
        percentFullfilled,
    };
}
