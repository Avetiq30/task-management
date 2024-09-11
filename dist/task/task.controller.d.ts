import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from "./dto/update-task.dto";
import { PaginationDto } from "./dto/pagination.dto";
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    findAll(paginationDto: PaginationDto): Promise<{
        tasks: import("./task.entity").Task[];
        total: number;
    }>;
    findOne(id: number): Promise<import("./task.entity").Task>;
    create(createTaskDto: CreateTaskDto): Promise<import("./task.entity").Task>;
    update(id: number, updateTaskDto: UpdateTaskDto): Promise<import("./task.entity").Task>;
}
