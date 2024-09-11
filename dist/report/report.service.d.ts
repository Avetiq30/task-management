import { Repository } from 'typeorm';
import { Task } from '../task/task.entity';
export declare class ReportService {
    private taskRepository;
    constructor(taskRepository: Repository<Task>);
    getCompletedTasksByUser(assignee: string): Promise<Task[]>;
    getAverageCompletionTime(): Promise<{
        averageCompletionTime: number;
    }>;
}
