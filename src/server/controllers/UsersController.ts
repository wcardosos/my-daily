import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../lib/prisma';
import { UserPrismaPostgresRepository } from '../repositories/User/UserPrismaPostgresRepository';
import httpStatus from '../../utils/httpStatus';
import { User } from '../entities/User';

export class UsersController {
  public static async checkIfUserExists(
    request: NextApiRequest,
    response: NextApiResponse,
  ): Promise<NextApiResponse> {
    const usersRepository = new UserPrismaPostgresRepository(prisma);

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
    const usersRepository = new UserPrismaPostgresRepository(prisma);

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

  public static async delete(
    request: NextApiRequest,
    response: NextApiResponse,
  ): Promise<NextApiResponse> {
    const { email } = request.query;

    const usersRepository = new UserPrismaPostgresRepository(prisma);

    await usersRepository.delete(email as string);

    return response.status(httpStatus.ACCEPTED).end();
  }
}
