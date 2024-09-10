import { Test, TestingModule } from '@nestjs/testing';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { Task } from '../task/task.entity';

describe('ReportController', () => {
  let controller: ReportController;
  let service: ReportService;

  const mockCompletedTasks: Task[] = [
    {
      id: 1,
      title: 'Task 1',
      description: '',
      dueDate: new Date(),
      priority: 'LOW',
      assignee: 'user',
      status: 'COMPLETE',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ];

  const mockAverageCompletionTime = { averageCompletionTime: 5 };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportController],
      providers: [
        {
          provide: ReportService,
          useValue: {
            getCompletedTasksByUser: jest.fn(),
            getAverageCompletionTime: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ReportController>(ReportController);
    service = module.get<ReportService>(ReportService);
  });

  describe('When retrieving completed tasks by user', () => {
    it('should return the list of completed tasks for the specified user', async () => {
      jest.spyOn(service, 'getCompletedTasksByUser').mockResolvedValue(mockCompletedTasks);

      expect(await controller.getCompletedTasksByUser('user')).toEqual(mockCompletedTasks);
    });
  });

  describe('When calculating average completion time', () => {
    it('should return the average completion time of tasks', async () => {
      jest.spyOn(service, 'getAverageCompletionTime').mockResolvedValue(mockAverageCompletionTime);

      expect(await controller.getAverageCompletionTime()).toEqual(mockAverageCompletionTime);
    });
  });
});
