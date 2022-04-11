import { PrismaClient } from '@prisma/client';
import { Task } from '../../../../src/server/entities/Task';
import { TaskPrismaPostgresRepository } from '../../../../src/server/repositories/Task/TaskPrismaPostgresRepository';

describe('Repository: TaskPrismaPostgres', () => {
  const prismaClientMock = {} as jest.MockedObject<PrismaClient>;
  const taskPrismaMock = {
    create: jest.fn(),
    findMany: jest.fn(),
  };
  prismaClientMock.task = taskPrismaMock as any;

  const taskPrismaPostgresRepository = new TaskPrismaPostgresRepository(prismaClientMock);

  describe('getByDaily', () => {
    it('Should return tasks', async() => {
      taskPrismaMock.findMany.mockResolvedValue(['task 1', 'task 2']);

      const result = await taskPrismaPostgresRepository.getByDaily('daily id');

      expect(taskPrismaMock.findMany).toHaveBeenCalledWith({ where: { daily_id: 'daily id' } });
      expect(result).toEqual(['task 1', 'task 2']);
    });
  });

  describe('save', () => {
    it('Should return tasks', async() => {
      taskPrismaMock.create.mockResolvedValue(['task 1', 'task 2']);
      const taskMock = new Task('daily id', 'name', 'done');

      await taskPrismaPostgresRepository.save(taskMock);

      expect(taskPrismaMock.create).toHaveBeenCalledWith({
        data: {
          daily_id: 'daily id',
          name: 'name',
          type: 'done',
        },
      });
    });
  });
});