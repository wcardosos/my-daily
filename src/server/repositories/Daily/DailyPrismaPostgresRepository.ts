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
    const dailyDate = DateHandler.getToday();

    const daily = await this.client.daily.findFirst({
      where: {
        date: dailyDate,
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
    const dailyDate = DateHandler.getToday();

    const newDaily = await this.client.daily.create({
      data: {
        date: dailyDate,
        user_id: userEmail,
      },
    });

    return newDaily.id;
  }
}
