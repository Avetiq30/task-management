import {IsString, IsNotEmpty, IsDateString, IsEnum} from 'class-validator';
import {TaskPriority} from "../task.enum";

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    description: string;

    @IsDateString()
    dueDate: Date;


    @IsEnum(TaskPriority, { message: 'Priority must be LOW, MEDIUM, or HIGH' })
    priority: TaskPriority;


    @IsString()
    assignee: string;
}
