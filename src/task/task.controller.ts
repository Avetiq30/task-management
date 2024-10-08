import {Controller, Get, Post, Param, Body, Put, Query} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import {UpdateTaskDto} from "./dto/update-task.dto";
import {PaginationDto} from "./dto/pagination.dto";

@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get()
    async findAll(@Query() paginationDto: PaginationDto) {
        return this.taskService.findAll(paginationDto);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.taskService.findOne(id);
    }

    @Post()
    create(@Body() createTaskDto: CreateTaskDto) {
        return this.taskService.createTask(createTaskDto);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
        return this.taskService.updateTask(id, updateTaskDto);
    }
}
