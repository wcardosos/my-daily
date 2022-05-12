import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../lib/prisma';
import { Task } from '../entities/Task';
import { DateHandler } from '../providers/DateHandler';
import { DailyPrismaPostgresRepository } from '../repositories/Daily/DailyPrismaPostgresRepository';
import { TaskPrismaPostgresRepository } from '../repositories/Task/TaskPrismaPostgresRepository';
import httpStatus from '../../utils/httpStatus';

export class TasksController {
  public static async getByDaily(
    request: NextApiRequest,
    response: NextApiResponse,
  ): Promise<void> {
    const { dateToSearch, userEmail } = request.query;

    const date = new Date(dateToSearch as string);

    const dailyDate = DateHandler.getFormatted(date);

    const tasksRepository = new TaskPrismaPostgresRepository(prisma);
    const dailyRepository = new DailyPrismaPostgresRepository(prisma);

    const dailyId = await dailyRepository.getIdByDate(dailyDate, userEmail as string);

    if (!dailyId) {
      return response.json([]);
    }

    const tasks = await tasksRepository.getByDaily(dailyId);

    return response.json(tasks);
  }

  public static async getToday(
    request: NextApiRequest,
    response: NextApiResponse,
  ): Promise<void> {
    const { user } = request.query;

    const dailyRepository = new DailyPrismaPostgresRepository(prisma);
    const tasksRepository = new TaskPrismaPostgresRepository(prisma);

    let dailyTodayId = await dailyRepository.getToday(user as string);

    if (!dailyTodayId) {
      dailyTodayId = await dailyRepository.saveToday(user as string);
    }

    const tasks = await tasksRepository.getByDaily(dailyTodayId as string);

    return response.json(tasks);
  }

  public static async create(
    request: NextApiRequest,
    response: NextApiResponse,
  ): Promise<NextApiResponse> {
    const { name, type } = request.body;
    const { dailyId } = request.query;

    const tasksRepository = new TaskPrismaPostgresRepository(prisma);

    const newTask = new Task(dailyId as string, name, type);

    await tasksRepository.save(newTask);

    return response.status(httpStatus.CREATED).end();
  }

  public static async createToday(
    request: NextApiRequest,
    response: NextApiResponse,
  ): Promise<void> {
    const { user, name, type } = request.body;

    const dailyRepository = new DailyPrismaPostgresRepository(prisma);
    const tasksRepository = new TaskPrismaPostgresRepository(prisma);

    let dailyTodayId = await dailyRepository.getToday(user);

    if (!dailyTodayId) {
      dailyTodayId = await dailyRepository.saveToday(user);
    }

    const newTask = new Task(dailyTodayId, name, type);

    const { id } = await tasksRepository.save(newTask);

    return response.status(httpStatus.CREATED).json({ id });
  }

  public static async delete(
    request: NextApiRequest,
    response: NextApiResponse,
  ): Promise<NextApiResponse> {
    const { id } = request.query;

    const tasksRepository = new TaskPrismaPostgresRepository(prisma);

    await tasksRepository.delete(id as string);

    return response.status(httpStatus.ACCEPTED).end();
  }
}
