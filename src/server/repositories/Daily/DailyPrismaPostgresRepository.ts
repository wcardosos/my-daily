/* eslint-disable no-unused-vars */
import { PrismaClient } from '@prisma/client';
import { DateHandler } from '../../providers/DateHandler';

export class DailyPrismaPostgresRepository {
  private client: PrismaClient;

  constructor(
    client: PrismaClient,
  ) {
    this.client = client;
  }

  public async getToday(): Promise<string | null> {
    const newDailyId = DateHandler.getToday();

    const daily = await this.client.daily.findUnique({
      where: {
        id: newDailyId,
      },
    });

    if (!daily) {
      return null;
    }

    return daily.id;
  }

  public async saveToday(): Promise<string> {
    const newDailyId = DateHandler.getToday();

    await this.client.daily.create({
      data: {
        id: newDailyId,
        user_id: 'wagner@test.com',
      },
    });

    return newDailyId;
  }
}
