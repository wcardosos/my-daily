import { NextApiRequest, NextApiResponse } from 'next';
import { Task as TaskPrisma } from '@prisma/client';
import { TasksController } from '../../../src/server/controllers/TasksController';
import { TaskPrismaPostgresRepository } from '../../../src/server/repositories/Task/TaskPrismaPostgresRepository';
import { Task } from '../../../src/server/entities/Task';

jest.mock('@prisma/client');
jest.mock('../../../src/server/repositories/Task/TaskPrismaPostgresRepository');

describe('Controller: Tasks', () => {
  const requestMock = {} as NextApiRequest;
  const responseMock = {} as NextApiResponse;
  const endRequestMock = jest.fn();
  const statusMock = jest.fn().mockReturnValue({
    end: endRequestMock,
  });

  requestMock.query = { dailyId: 'daily id' };

  responseMock.status = statusMock;

  const getByDailySpy = jest.spyOn(TaskPrismaPostgresRepository.prototype, 'getByDaily');
  const saveSpy = jest.spyOn(TaskPrismaPostgresRepository.prototype, 'save');
  const deleteSpy = jest.spyOn(TaskPrismaPostgresRepository.prototype, 'delete');

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getByDaily', () => {
    const responseJsonSpy = jest.fn();
    responseMock.json = responseJsonSpy;
    it('Should return the tasks', async() => {
      getByDailySpy.mockResolvedValue([
        'task 1' as unknown as TaskPrisma,
        'task 2' as unknown as TaskPrisma,
      ]);

      await TasksController.getByDaily(requestMock, responseMock);

      expect(responseJsonSpy).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    requestMock.body = { name: 'name', type: 'done' };

    it('Should create a new task', async() => {
      await TasksController.create(requestMock, responseMock);

      const expectedNewTask = new Task('daily id', 'name', 'done');

      expect(saveSpy).toHaveBeenCalledWith(expectedNewTask);
    });
  });

  describe('delete', () => {
    requestMock.query.id = 'task id';

    it('Should delete a task', async() => {
      await TasksController.delete(requestMock, responseMock);

      expect(deleteSpy).toHaveBeenCalledWith('task id');
    });
  });
});
