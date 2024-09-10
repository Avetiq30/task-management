import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {PaginationDto} from "./dto/pagination.dto";

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
    ) {}

    async findAll(paginationDto: PaginationDto): Promise<{ tasks: Task[], total: number }> {
        const { page, limit } = paginationDto;

        const [tasks, total] = await this.taskRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
        });

        return {
            tasks,
            total,
        };
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
        const task = this.taskRepository.create(createTaskDto);
        return this.taskRepository.save(task);
    }

    async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {

        const task = await this.taskRepository.findOneBy({ id });
        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }

        Object.assign(task, updateTaskDto);
        return this.taskRepository.save(task);
    }
}
