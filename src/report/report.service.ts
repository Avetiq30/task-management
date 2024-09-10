import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../task/task.entity';

@Injectable()
export class ReportService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
    ) {}

    async getCompletedTasksByUser(assignee: string) {
        return this.taskRepository.find({ where: { assignee, status: 'COMPLETE' } });
    }

    async getAverageCompletionTime(): Promise<{ averageCompletionTime: number }> {
        const tasks = await this.taskRepository.find({ where: { status: 'COMPLETE' } });

        if (tasks.length === 0) {
            return { averageCompletionTime: 0 };
        }

        const times = tasks.map(task => {
            const duration = new Date(task.updatedAt).getTime() - new Date(task.createdAt).getTime();
            return duration / (1000 * 60 * 60);
        });

        const averageTime = times.reduce((a, b) => a + b, 0) / times.length;
        return { averageCompletionTime: averageTime };
    }
}
