import { Test, TestingModule } from '@nestjs/testing';
import { ReportService } from './report.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from '../task/task.entity';
import { Repository } from 'typeorm';
import {TaskPriority, TaskStatus} from "../task/task.enum";

describe('ReportService', () => {
  let service: ReportService;
  let repository: Repository<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportService,
        {
          provide: getRepositoryToken(Task),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ReportService>(ReportService);
    repository = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  describe('When retrieving completed tasks by user', () => {
    it('should return completed tasks for the specified user', async () => {
      const assignee = 'user';
      const tasks = [
        { id: 1, title: 'Task 1', description: '', dueDate: new Date(), priority: TaskPriority.LOW, assignee, status: TaskStatus.COMPLETE, createdAt: new Date(), updatedAt: new Date() },
      ];

      jest.spyOn(repository, 'find').mockResolvedValue(tasks);

      const result = await service.getCompletedTasksByUser(assignee);
      expect(result).toEqual(tasks);
      expect(repository.find).toHaveBeenCalledWith({ where: { assignee, status: 'COMPLETE' } });
    });
  });

  describe('When calculating average completion time', () => {
    it('should return 0 if no completed tasks exist', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([]);

      const result = await service.getAverageCompletionTime();
      expect(result).toEqual({ averageCompletionTime: 0 });
    });

    it('should calculate and return the average completion time for completed tasks', async () => {
      const tasks = [
        { id: 1, title: 'Task 1', description: '', dueDate: new Date(), priority: TaskPriority.LOW, assignee: 'user', status: TaskStatus.COMPLETE, createdAt: new Date('2023-09-01T00:00:00'), updatedAt: new Date('2023-09-01T05:00:00') },
        { id: 2, title: 'Task 2', description: '', dueDate: new Date(), priority: TaskPriority.LOW, assignee: 'user', status: TaskStatus.COMPLETE, createdAt: new Date('2023-09-01T00:00:00'), updatedAt: new Date('2023-09-01T10:00:00') },
      ];

      jest.spyOn(repository, 'find').mockResolvedValue(tasks);

      const result = await service.getAverageCompletionTime();
      expect(result).toEqual({ averageCompletionTime: 7.5 });
    });
  });
});
