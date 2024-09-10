import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import {IsEnum, IsOptional} from "class-validator";

export class UpdateTaskDto extends PartialType(CreateTaskDto) {

    @IsEnum(['PENDING', 'IN_PROGRESS', 'COMPLETE'], { message: 'Status must be PENDING, IN_PROGRESS, or COMPLETE' })
    @IsOptional()
    status?: string;
}
