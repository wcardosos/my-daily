import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../lib/prisma';
import { DailyPrismaPostgresRepository } from '../repositories/Daily/DailyPrismaPostgresRepository';
import httpStatus from '../../utils/httpStatus';

export class DailiesController {
  public static async deleteByUser(
    request: NextApiRequest,
    response: NextApiResponse,
  ): Promise<NextApiResponse> {
    const { email: userEmail } = request.query;

    const dailyRepository = new DailyPrismaPostgresRepository(prisma);

    await dailyRepository.deleteAllByUser(userEmail as string);

    return response.status(httpStatus.OK).end();
  }
}
