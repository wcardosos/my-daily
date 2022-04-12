/* eslint-disable no-unused-vars */
import { PrismaClient, Task as TaskPrisma, TaskType } from '@prisma/client';
import { Task } from '../../entities/Task';

export class TaskPrismaPostgresRepository {
  private client: PrismaClient;

  constructor(
    client: PrismaClient,
  ) {
    this.client = client;
  }

  public async getByDaily(dailyId: string): Promise<TaskPrisma[]> {
    const tasks = await this.client.task.findMany({
      where: {
        daily_id: dailyId as string,
      },
    });

    return tasks;
  }

  public async save(task: Task): Promise<void> {
    const {
      dailyId,
      name,
      type,
    } = task.get();

    await this.client.task.create({
      data: {
        daily_id: dailyId,
        name,
        type: TaskType[type],
      },
    });
  }

  public async delete(id: string): Promise<void> {
    await this.client.task.delete({
      where: {
        id,
      },
    });
  }
}
