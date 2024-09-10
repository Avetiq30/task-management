import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import {UpdateTaskDto} from "./dto/update-task.dto";

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
    ) {}

    findAll(): Promise<Task[]> {
        return this.taskRepository.find();
    }

    findOne(id: number): Promise<Task> {
        return this.taskRepository.findOneBy({ id });
    }

    createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const task = this.taskRepository.create(createTaskDto);
        return this.taskRepository.save(task);
    }

    async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
        const task = await this.taskRepository.findOneBy({ id });
        if (!task) {
            throw new Error('Task not found');
        }
        Object.assign(task, updateTaskDto);
        return this.taskRepository.save(task);
    }
}
