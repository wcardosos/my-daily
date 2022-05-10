import { NextApiRequest, NextApiResponse } from 'next';
import { Task as TaskPrisma } from '@prisma/client';
import { TasksController } from '../../../src/server/controllers/TasksController';
import { TaskPrismaPostgresRepository } from '../../../src/server/repositories/Task/TaskPrismaPostgresRepository';
import { Task } from '../../../src/server/entities/Task';
import { DailyPrismaPostgresRepository } from '../../../src/server/repositories/Daily/DailyPrismaPostgresRepository';
import { DateHandler } from '../../../src/server/providers/DateHandler';

jest.mock('@prisma/client');
jest.mock('../../../src/server/repositories/Task/TaskPrismaPostgresRepository');
jest.mock('../../../src/server/repositories/Daily/DailyPrismaPostgresRepository');

describe('Controller: Tasks', () => {
  const requestMock = {} as NextApiRequest;
  const responseMock = {} as NextApiResponse;
  const responseJsonSpy = jest.fn();
  const endResponseMock = jest.fn();
  const statusMock = jest.fn().mockReturnValue({
    end: endResponseMock,
    json: responseJsonSpy,
  });

  requestMock.query = { dailyId: 'daily id' };

  responseMock.status = statusMock;
  responseMock.json = responseJsonSpy;

  const getByDailyTaskRepositorySpy = jest.spyOn(TaskPrismaPostgresRepository.prototype, 'getByDaily');
  const saveTaskRepositorySpy = jest.spyOn(TaskPrismaPostgresRepository.prototype, 'save');
  const deleteTaskRepositorySpy = jest.spyOn(TaskPrismaPostgresRepository.prototype, 'delete');

  const getIdByDateDailyRepositorySpy = jest.spyOn(DailyPrismaPostgresRepository.prototype, 'getIdByDate');
  const getTodayDailyRepositorySpy = jest.spyOn(DailyPrismaPostgresRepository.prototype, 'getToday');
  const saveTodayDailyRepositorySpy = jest.spyOn(DailyPrismaPostgresRepository.prototype, 'saveToday');

  const getFormattedDateHandlerSpy = jest.spyOn(DateHandler, 'getFormatted');

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getByDaily', () => {
    requestMock.query.dateToSearch = 'date';
    requestMock.query.userEmail = 'email';

    it('Should return the tasks', async() => {
      getByDailyTaskRepositorySpy.mockResolvedValue([
        'task 1' as unknown as TaskPrisma,
        'task 2' as unknown as TaskPrisma,
      ]);
      getFormattedDateHandlerSpy.mockReturnValue('date formatted');
      getIdByDateDailyRepositorySpy.mockResolvedValue('daily id');
      const dateMock = jest.fn();
      global.Date = dateMock as unknown as typeof Date;

      dateMock.mockReturnValue('new date formatted');

      await TasksController.getByDaily(requestMock, responseMock);

      expect(dateMock).toHaveBeenCalledWith('date');
      expect(getFormattedDateHandlerSpy).toHaveBeenCalled();
      expect(getByDailyTaskRepositorySpy).toHaveBeenCalledWith('daily id');
      expect(responseJsonSpy).toHaveBeenCalled();
    });
  });

  describe('getToday', () => {
    it('Should get today daily tasks', async() => {
      getByDailyTaskRepositorySpy.mockResolvedValue([
        'task 1' as unknown as TaskPrisma,
        'task 2' as unknown as TaskPrisma,
      ]);
      getTodayDailyRepositorySpy.mockResolvedValueOnce('daily id');

      await TasksController.getToday(requestMock, responseMock);

      expect(getByDailyTaskRepositorySpy).toHaveBeenCalledWith('daily id');
      expect(responseJsonSpy).toHaveBeenCalled();
    });

    it('Should create a daily when not exists and return today daily tasks', async() => {
      getByDailyTaskRepositorySpy.mockResolvedValue([
        'task 1' as unknown as TaskPrisma,
        'task 2' as unknown as TaskPrisma,
      ]);
      getTodayDailyRepositorySpy.mockResolvedValueOnce(null);

      await TasksController.getToday(requestMock, responseMock);

      expect(saveTodayDailyRepositorySpy).toHaveBeenCalled();
      expect(responseJsonSpy).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    requestMock.body = { name: 'name', type: 'done' };

    it('Should create a new task', async() => {
      await TasksController.create(requestMock, responseMock);

      const expectedNewTask = new Task('daily id', 'name', 'done');

      expect(saveTaskRepositorySpy).toHaveBeenCalledWith(expectedNewTask);
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(endResponseMock).toHaveBeenCalled();
    });
  });

  describe('createToday', () => {
    requestMock.body = { name: 'name', type: 'done' };

    it('Should get today daily tasks', async() => {
      saveTaskRepositorySpy.mockResolvedValueOnce({
        id: 'task id',
        daily_id: 'daily id',
        created_at: new Date(),
        name: 'task',
        type: 'done',
      });
      getByDailyTaskRepositorySpy.mockResolvedValue([
        'task 1' as unknown as TaskPrisma,
        'task 2' as unknown as TaskPrisma,
      ]);
      getTodayDailyRepositorySpy.mockResolvedValueOnce('daily id');

      await TasksController.createToday(requestMock, responseMock);

      expect(saveTaskRepositorySpy).toHaveBeenCalled();
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(responseJsonSpy).toHaveBeenCalledWith({ id: 'task id' });
    });

    it('Should create a daily when not exists and return today daily tasks', async() => {
      saveTaskRepositorySpy.mockResolvedValueOnce({
        id: 'task id',
        daily_id: 'daily id',
        created_at: new Date(),
        name: 'task',
        type: 'done',
      });
      getByDailyTaskRepositorySpy.mockResolvedValue([
        'task 1' as unknown as TaskPrisma,
        'task 2' as unknown as TaskPrisma,
      ]);
      getTodayDailyRepositorySpy.mockResolvedValueOnce(null);

      await TasksController.createToday(requestMock, responseMock);

      expect(saveTodayDailyRepositorySpy).toHaveBeenCalled();
      expect(saveTaskRepositorySpy).toHaveBeenCalled();
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(responseJsonSpy).toHaveBeenCalledWith({ id: 'task id' });
    });
  });

  describe('delete', () => {
    requestMock.query.id = 'task id';

    it('Should delete a task', async() => {
      await TasksController.delete(requestMock, responseMock);

      expect(deleteTaskRepositorySpy).toHaveBeenCalledWith('task id');
      expect(statusMock).toHaveBeenCalledWith(202);
      expect(endResponseMock).toHaveBeenCalled();
    });
  });
});
