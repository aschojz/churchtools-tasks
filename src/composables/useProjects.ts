import { computed } from 'vue';
import { useRouter } from 'vue-router';
import useCustommodule from '../custommodule/useCustommodule';
import { KEY } from '../main';

export default function useProjects() {
    const { currentRoute } = useRouter();
    const {
        categories,
        createCategory,
        custommodule,
        updateCategory,
        deleteCategory,
    } = useCustommodule(KEY);

    const projectId = computed(() => {
        const id = Array.isArray(currentRoute.value.params.projectId)
            ? currentRoute.value.params.projectId[0]
            : currentRoute.value.params.projectId;
        return parseInt(id);
    });

    const projects = computed(() =>
        categories.value.filter((cat) => cat.shorty?.startsWith('project'))
    );

    const project = computed(() =>
        projects.value.find((pro) => String(pro.id) === String(projectId.value))
    );

    const createProject = (project: Project) => {
        const lastId = projects.value[projects.value.length - 1]?.id ?? 0;
        const schema = { ...project };
        delete schema.name;
        delete schema.description;
        createCategory({
            name: project.name,
            description: project.description,
            shorty: `project_${lastId + 1}`,
            securityLevelId: 1,
            customModuleId: custommodule.value?.id,
            schema: JSON.stringify(schema),
        });
    };
    const updateProject = (project: Partial<Project>) => {
        const schema = { ...project };
        delete schema.name;
        delete schema.description;
        delete schema.shorty;
        delete schema.securityLevelId;
        delete schema.customModuleId;
        delete schema.schema;
        delete schema.id;
        updateCategory({ ...project, schema: JSON.stringify(schema) });
    };

    const deleteProject = (id: number) => {
        deleteCategory(id);
    };
    return {
        projectId,
        project,
        projects,
        createProject,
        updateProject,
        deleteProject,
    };
}
