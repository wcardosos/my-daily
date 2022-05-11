import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { DailyPrismaPostgresRepository } from '../repositories/Daily/DailyPrismaPostgresRepository';
import httpStatus from '../../utils/httpStatus';

export class DailiesController {
  public static async deleteByUser(
    request: NextApiRequest,
    response: NextApiResponse,
  ): Promise<NextApiResponse> {
    const { userEmail } = request.query;

    const prismaClient = new PrismaClient();

    const dailyRepository = new DailyPrismaPostgresRepository(prismaClient);

    await dailyRepository.deleteAllByUser(userEmail as string);

    return response.status(httpStatus.OK).end();
  }
}
