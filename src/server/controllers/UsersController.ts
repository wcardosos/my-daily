import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { UserPrismaPostgresRepository } from '../repositories/User/UserPrismaPostgresRepository';
import httpStatus from '../../utils/httpStatus';
import { User } from '../entities/User';

export class UsersController {
  public static async checkIfUserExists(
    request: NextApiRequest,
    response: NextApiResponse,
  ): Promise<NextApiResponse> {
    const prismaClient = new PrismaClient();

    const usersRepository = new UserPrismaPostgresRepository(prismaClient);

    const { email } = request.query;

    const user = await usersRepository.getByEmail(email as string);

    if (user) {
      return response.status(httpStatus.OK).end();
    }

    return response.status(httpStatus.NOT_FOUND).end();
  }

  public static async create(
    request: NextApiRequest,
    response: NextApiResponse,
  ): Promise<NextApiResponse> {
    const prismaClient = new PrismaClient();

    const usersRepository = new UserPrismaPostgresRepository(prismaClient);

    const {
      email,
      name,
      pictureUrl,
      provider,
    } = request.body;

    const user = new User(
      email,
      provider,
      name,
      null,
      pictureUrl,
    );

    await usersRepository.save(user);

    return response.status(httpStatus.CREATED).end();
  }
}
