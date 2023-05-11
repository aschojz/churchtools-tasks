import { computed } from 'vue';
import { KEY } from '../main';
import useProjects from './useProjects';
import useCustommodule from '../custommodule/useCustommodule';

export default function useTags() {
    const { values, createValue, updateValue } = useCustommodule(KEY);
    const { projectId } = useProjects();

    const tags = computed(() => {
        const tags: TransformedTag[] = values.value.filter(
            (v: TransformedTag) =>
                v.type === 'tag' && v.dataCategoryId === projectId.value
        );
        return Object.fromEntries(tags.map((tag) => [tag.id, tag]));
    });
    const tagsArray = computed(() =>
        Object.values(tags.value).map((tag) => ({
            ...tag,
            icon: 'fas fa-circle',
            color: { key: tag.color },
        }))
    );

    const createTag = (tag: Tag) => {
        createValue({ ...tag, dataCategoryId: projectId.value, type: 'tag' });
    };

    const updateTag = (tag: TransformedTag) => {
        updateValue({ ...tag, dataCategoryId: projectId.value, type: 'tag' });
    };
    return { tags, tagsArray, createTag, updateTag };
}
