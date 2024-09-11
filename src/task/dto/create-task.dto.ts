import {IsString, IsNotEmpty, IsDateString, IsEnum} from 'class-validator';
import {TaskPriority} from "../task.enum";
import {ApiProperty} from "@nestjs/swagger";

export class CreateTaskDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsDateString()
    dueDate: Date;


    @ApiProperty()
    @IsEnum(TaskPriority, { message: 'Priority must be LOW, MEDIUM, or HIGH' })
    priority: TaskPriority;

    @ApiProperty()
    @IsString()
    assignee: string;
}
