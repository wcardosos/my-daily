import { PrismaClient } from '@prisma/client';
import { Task } from '../../../../src/server/entities/Task';
import { TaskPrismaPostgresRepository } from '../../../../src/server/repositories/Task/TaskPrismaPostgresRepository';

describe('Repository: TaskPrismaPostgres', () => {
  const prismaClientMock = {} as jest.MockedObject<PrismaClient>;
  const taskPrismaMock = {
    create: jest.fn(),
    delete: jest.fn(),
    findMany: jest.fn(),
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    it('Should save tasks', async() => {
      taskPrismaMock.create.mockResolvedValue('task');
      const taskMock = new Task('daily id', 'name', 'done');

      const result = await taskPrismaPostgresRepository.save(taskMock);

      expect(taskPrismaMock.create).toHaveBeenCalledWith({
        data: {
          daily_id: 'daily id',
          name: 'name',
          type: 'done',
        },
      });
      expect(result).toBe('task');
    });
  });

  describe('delete', () => {
    it('Should delete a task', async() => {
      await taskPrismaPostgresRepository.delete('task id');

      expect(taskPrismaMock.delete).toHaveBeenCalledWith({
        where: {
          id: 'task id',
        },
      });
    });
  });
});
