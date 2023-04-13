interface Project {
    name: string;
    description?: string;
    color?: string;
    icon?: string;
}
interface TaskList {
    type: 'list';
    name: string;
    sortKey: number;
    isCollapsed?: boolean;
}
interface Task {
    type: 'task';
    fullfilled: boolean;
    name: string;
    description?: string;
    url?: string;
    dueDate?: string;
    allDay?: boolean;
    sortKey: number;
    list?: number;
    tags?: number[];
    assignedTo?: number[];
    subTasks?: number[];
    comments?: number[];
    createdBy: number;
    createdDate: string;
    modifiedBy: number;
    modifiedDate: string;
}
interface Tag {
    type: 'tag';
    name: string;
    color: string;
    sortKey: number;
}

type TransformedTag = Tag & { id: number; dataCategoryId: number };
type TransformedTask = Task & { id: number; dataCategoryId: number };
type TransformedList = TaskList & {
    id: number;
    dataCategoryId: number;
    items?: TransformedTask[];
};
