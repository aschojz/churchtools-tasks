interface TaskList {
    name: string;
    type: 'list';
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
    tags?: number[];
    assignedTo?: number[];
    subTasks?: number[];
    comments?: number[];
    createdBy: number;
    createdDate: string;
    modifiedBy: number;
    modifiedDate: string;
}

type TransformedTask = Task & { id: number; dataCategoryId: number };
type TransformedList = TaskList & {
    id: number;
    dataCategoryId: number;
    items: TransformedTask[];
};
