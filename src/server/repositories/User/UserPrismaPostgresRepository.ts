/* eslint-disable no-unused-vars */
import { PrismaClient, User as UserPrisma } from '@prisma/client';
import { User } from '../../entities/User';

export class UserPrismaPostgresRepository {
  private client: PrismaClient;

  constructor(
    client: PrismaClient,
  ) {
    this.client = client;
  }

  public async getByEmail(email: string): Promise<UserPrisma> {
    const user = await this.client.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  public async save(user: User): Promise<UserPrisma> {
    const {
      email,
      name,
      pictureUrl,
    } = user.get();

    return this.client.user.create({
      data: {
        email,
        name,
        picture_url: pictureUrl,
        provider: 'github',
      },
    });
  }

  public async delete(email: string): Promise<void> {
    await this.client.user.delete({
      where: {
        email,
      },
    });
  }
}
