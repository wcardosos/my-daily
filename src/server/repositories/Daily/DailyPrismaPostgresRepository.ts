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

  public async getToday(user: string): Promise<string | null> {
    const newDailyId = DateHandler.getToday();

    const daily = await this.client.daily.findFirst({
      where: {
        id: newDailyId,
        user: {
          email: user,
        },
      },
    });

    if (!daily) {
      return null;
    }

    return daily.id;
  }

  public async saveToday(userEmail: string): Promise<string> {
    const newDailyId = DateHandler.getToday();

    await this.client.daily.create({
      data: {
        id: newDailyId,
        user_id: userEmail,
      },
    });

    return newDailyId;
  }
}
