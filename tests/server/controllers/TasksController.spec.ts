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

  requestMock.query = { dailyId: 'daily id' };

  const getByDailySpy = jest.spyOn(TaskPrismaPostgresRepository.prototype, 'getByDaily');
  const saveSpy = jest.spyOn(TaskPrismaPostgresRepository.prototype, 'save');

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
    const endRequestMock = jest.fn();
    const statusMock = jest.fn().mockReturnValue({
      end: endRequestMock,
    });
    responseMock.status = statusMock;

    it('Should create a new task', async() => {
      await TasksController.create(requestMock, responseMock);

      const newTaskMock = new Task('daily id', 'name', 'done');

      expect(saveSpy).toHaveBeenCalledWith(newTaskMock);
      expect(statusMock).toHaveBeenCalled();
      expect(endRequestMock).toHaveBeenCalled();
    });
  });
});
