import { ReportService } from './report.service';
export declare class ReportController {
    private readonly reportService;
    constructor(reportService: ReportService);
    getCompletedTasksByUser(assignee: string): Promise<import("../task/task.entity").Task[]>;
    getAverageCompletionTime(): Promise<{
        averageCompletionTime: number;
    }>;
}
