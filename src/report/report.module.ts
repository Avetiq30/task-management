import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Task} from "../task/task.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [ReportController],
  providers: [ReportService]
})
export class ReportModule {}
