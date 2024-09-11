import { TaskPriority } from "../task.enum";
export declare class CreateTaskDto {
    title: string;
    description: string;
    dueDate: Date;
    priority: TaskPriority;
    assignee: string;
}
