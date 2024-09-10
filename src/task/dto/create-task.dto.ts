import {IsString, IsNotEmpty, IsDateString, IsEnum} from 'class-validator';

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    description: string;

    @IsDateString()
    dueDate: Date;

    @IsEnum(['LOW', 'MEDIUM', 'HIGH'], { message: 'Priority must be LOW, MEDIUM, or HIGH' })
    priority: string;


    @IsString()
    assignee: string;
}
