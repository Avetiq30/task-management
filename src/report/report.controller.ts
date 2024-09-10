import { Controller, Get, Query } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('reports')
export class ReportController {
    constructor(private readonly reportService: ReportService) {}

    @Get('completed-by-user')
    getCompletedTasksByUser(@Query('assignee') assignee: string) {
        return this.reportService.getCompletedTasksByUser(assignee);
    }

    @Get('average-completion-time')
    getAverageCompletionTime() {
        return this.reportService.getAverageCompletionTime();
    }
}
