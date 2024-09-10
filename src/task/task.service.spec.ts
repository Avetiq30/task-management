import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

describe('TaskService', () => {
  let service: TaskService;
  let repository: Repository<Task>;

  const mockTask: Task = {
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

  const mockTasks: Task[] = [mockTask];

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
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(Task),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
    repository = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  describe('When retrieving all tasks', () => {
    it('should return an array of tasks', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue(mockTasks);

      expect(await service.findAll()).toEqual(mockTasks);
    });
  });

  describe('When retrieving a task by ID', () => {
    it('should return the task with the specified ID', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(mockTask);

      expect(await service.findOne(1)).toEqual(mockTask);
    });
  });

  describe('When creating a new task', () => {
    it('should create and return the new task', async () => {
      const createdTask: Task = { ...mockCreateTaskDto, id: 1, status: 'PENDING', createdAt: new Date(), updatedAt: new Date() };
      jest.spyOn(repository, 'create').mockReturnValue(createdTask);
      jest.spyOn(repository, 'save').mockResolvedValue(createdTask);

      expect(await service.createTask(mockCreateTaskDto)).toEqual(createdTask);
    });
  });

  describe('When updating a task', () => {
    it('should update and return the task with new details', async () => {
      const updatedTask: Task = { ...mockTask, ...mockUpdateTaskDto };

      jest.spyOn(repository, 'findOneBy').mockResolvedValue(mockTask);
      jest.spyOn(repository, 'save').mockResolvedValue(updatedTask);

      expect(await service.updateTask(1, mockUpdateTaskDto)).toEqual(updatedTask);
    });
  });
});
