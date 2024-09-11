"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_entity_1 = require("../task/task.entity");
const task_enum_1 = require("../task/task.enum");
let ReportService = class ReportService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async getCompletedTasksByUser(assignee) {
        return this.taskRepository.find({ where: { assignee, status: task_enum_1.TaskStatus.COMPLETE } });
    }
    async getAverageCompletionTime() {
        const tasks = await this.taskRepository.find({ where: { status: task_enum_1.TaskStatus.COMPLETE } });
        const millisecondsInHour = 1000 * 60 * 60;
        if (tasks.length === 0) {
            return { averageCompletionTime: 0 };
        }
        const times = tasks.map(task => {
            const duration = new Date(task.updatedAt).getTime() - new Date(task.createdAt).getTime();
            return duration / millisecondsInHour;
        });
        const averageTime = times.reduce((a, b) => a + b, 0) / times.length;
        return { averageCompletionTime: averageTime };
    }
};
exports.ReportService = ReportService;
exports.ReportService = ReportService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ReportService);
//# sourceMappingURL=report.service.js.map