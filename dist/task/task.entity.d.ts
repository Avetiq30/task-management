import { TaskPriority } from './task.enum';
import { TaskStatus } from './task.enum';
export declare class Task {
    id: number;
    title: string;
    description: string;
    dueDate: Date;
    priority: TaskPriority;
    assignee: string;
    status: TaskStatus;
    createdAt: Date;
    updatedAt: Date;
}
