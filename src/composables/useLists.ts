import { computed } from 'vue';
import useCustommodule from '../custommodule/useCustommodule';
import { KEY } from '../main';
import useProjects from './useProjects';

export default function useLists() {
    const { values, createValue, updateValue } = useCustommodule(KEY);
    const { projectId } = useProjects();

    const lists = computed(() => {
        const lists: TransformedList[] = values.value.filter(
            (v: TransformedList) => v.type === 'list'
        );
        return lists;
    });

    const createList = (list: TaskList) => {
        createValue({ ...list, dataCategoryId: projectId.value, type: 'list' });
    };

    const updateList = (list: TransformedList) => {
        updateValue({ ...list, dataCategoryId: projectId.value, type: 'list' });
    };
    return { lists, createList, updateList };
}
