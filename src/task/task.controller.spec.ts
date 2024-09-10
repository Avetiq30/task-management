import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

describe('TaskController', () => {
  let controller: TaskController;
  let service: TaskService;

  const mockTask = {
    id: 1,
    title: 'Task 1',
    description: '',
    dueDate: new Date(),
    priority: 'LOW',
    assignee: 'user',
    status: 'PENDING',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockCreateTaskDto: CreateTaskDto = {
    title: 'New Task',
    description: 'Test',
    dueDate: new Date(),
    priority: 'MEDIUM',
    assignee: 'user',
  };

  const mockUpdateTaskDto: UpdateTaskDto = { status: 'COMPLETE' };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            createTask: jest.fn(),
            updateTask: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
    service = module.get<TaskService>(TaskService);
  });

  describe('When retrieving all tasks', () => {
    it('should return an array of tasks', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([mockTask]);

      expect(await controller.findAll()).toEqual([mockTask]);
    });
  });

  describe('When retrieving a task by ID', () => {
    it('should return the task with the specified ID', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockTask);

      expect(await controller.findOne(1)).toEqual(mockTask);
    });
  });

  describe('When creating a new task', () => {
    it('should create and return the new task', async () => {
      const createdTask = { ...mockTask, ...mockCreateTaskDto };
      jest.spyOn(service, 'createTask').mockResolvedValue(createdTask);

      expect(await controller.create(mockCreateTaskDto)).toEqual(createdTask);
    });
  });

  describe('When updating a task', () => {
    it('should update and return the task with new details', async () => {
      const updatedTask = { ...mockTask, ...mockUpdateTaskDto };
      jest.spyOn(service, 'updateTask').mockResolvedValue(updatedTask);

      expect(await controller.update(1, mockUpdateTaskDto)).toEqual(updatedTask);
    });
  });
});
