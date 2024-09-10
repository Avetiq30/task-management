import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
    ) {}

    async findAll(): Promise<Task[]> {
        const tasks = await this.taskRepository.find();
        if (!tasks.length) {
            throw new NotFoundException('No tasks found');
        }
        return tasks;
    }

    async findOne(id: number): Promise<Task> {
        if (!id) {
            throw new BadRequestException('Invalid task ID');
        }

        const task = await this.taskRepository.findOneBy({ id });
        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }

        return task;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        if (!createTaskDto.title || !createTaskDto.assignee) {
            throw new BadRequestException('Title and assignee are required');
        }

        const task = this.taskRepository.create(createTaskDto);
        return this.taskRepository.save(task);
    }

    async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
        if (!id) {
            throw new BadRequestException('Invalid task ID');
        }

        const task = await this.taskRepository.findOneBy({ id });
        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }

        if (!updateTaskDto.title && !updateTaskDto.assignee && !updateTaskDto.status) {
            throw new BadRequestException('At least one field must be updated');
        }

        Object.assign(task, updateTaskDto);
        return this.taskRepository.save(task);
    }
}
