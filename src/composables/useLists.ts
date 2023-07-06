import { computed, ref, watch } from 'vue';
import { KEY } from '../main';
import useProjects from './useProjects';
import useCustommodule from '../custommodule/useCustommodule';
import { taskStore } from './storeTasks';

export default function useLists() {
    const { values, createValue, updateValue, valueStore } =
        useCustommodule(KEY);
    const { projectId } = useProjects();

    const lists = computed(() => {
        const lists: TransformedList[] = values.value.filter(
            (v: TransformedList) => v.type === 'list',
        );
        return lists;
    });

    const store = taskStore();
    watch(
        () => valueStore.loadingState,
        () => {
            if (
                valueStore.loadingState === 'SUCCESS' &&
                !lists.value.some((l) => l.isDefault) &&
                !store.isCreatingDefaultList
            ) {
                store.isCreatingDefaultList = true;
                createList({
                    name: 'Unsortiert',
                    sortKey: 0,
                    type: 'list',
                    isDefault: true,
                    isCollapsed: false,
                });
            }
        },
    );

    const createList = (list: TaskList) => {
        createValue({ ...list, dataCategoryId: projectId.value, type: 'list' });
    };

    const updateList = (list: TransformedList) => {
        updateValue({ ...list, dataCategoryId: projectId.value, type: 'list' });
    };

    const getListById = (id: number) => {
        return lists.value.find((l) => l.id === id);
    };

    return { lists, createList, updateList, getListById };
}
