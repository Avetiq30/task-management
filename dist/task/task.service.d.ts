import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PaginationDto } from "./dto/pagination.dto";
export declare class TaskService {
    private taskRepository;
    constructor(taskRepository: Repository<Task>);
    findAll(paginationDto: PaginationDto): Promise<{
        tasks: Task[];
        total: number;
    }>;
    findOne(id: number): Promise<Task>;
    createTask(createTaskDto: CreateTaskDto): Promise<Task>;
    updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task>;
}
