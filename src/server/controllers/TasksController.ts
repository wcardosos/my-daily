import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
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
    const { dateToSearch } = request.query;

    const date = new Date(dateToSearch as string);

    const dailyId = DateHandler.getFormatted(date);

    const prismaClient = new PrismaClient();

    const tasksRepository = new TaskPrismaPostgresRepository(prismaClient);

    const tasks = await tasksRepository.getByDaily(dailyId as string);

    return response.json(tasks);
  }

  public static async getToday(
    request: NextApiRequest,
    response: NextApiResponse,
  ): Promise<void> {
    const { user } = request.query;
    const prismaClient = new PrismaClient();

    const dailyRepository = new DailyPrismaPostgresRepository(prismaClient);
    const tasksRepository = new TaskPrismaPostgresRepository(prismaClient);

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
    const prismaClient = new PrismaClient();

    const tasksRepository = new TaskPrismaPostgresRepository(prismaClient);

    const newTask = new Task(dailyId as string, name, type);

    await tasksRepository.save(newTask);

    return response.status(httpStatus.CREATED).end();
  }

  public static async createToday(
    request: NextApiRequest,
    response: NextApiResponse,
  ): Promise<void> {
    const { user, name, type } = request.body;
    const prismaClient = new PrismaClient();

    const dailyRepository = new DailyPrismaPostgresRepository(prismaClient);
    const tasksRepository = new TaskPrismaPostgresRepository(prismaClient);

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

    const prismaClient = new PrismaClient();

    const tasksRepository = new TaskPrismaPostgresRepository(prismaClient);

    await tasksRepository.delete(id as string);

    return response.status(httpStatus.ACCEPTED).end();
  }
}
