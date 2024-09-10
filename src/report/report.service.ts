import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../task/task.entity';
import {TaskStatus} from "../task/task.enum";

@Injectable()
export class ReportService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
    ) {}


    async getCompletedTasksByUser(assignee: string) {
        return this.taskRepository.find({ where: { assignee, status: TaskStatus.COMPLETE } });
    }

    async getAverageCompletionTime(): Promise<{ averageCompletionTime: number }> {
        const tasks = await this.taskRepository.find({ where: { status: TaskStatus.COMPLETE } });
        const millisecondsInHour = 1000 * 60 * 60;

        if (tasks.length === 0) {
            return { averageCompletionTime: 0 };
        }

        const times = tasks.map(task => {
            const duration = new Date(task.updatedAt).getTime() - new Date(task.createdAt).getTime();
            return duration / millisecondsInHour;
        });

        const averageTime = times.reduce((a, b) => a + b, 0) / times.length;
        return { averageCompletionTime: averageTime };
    }
}
