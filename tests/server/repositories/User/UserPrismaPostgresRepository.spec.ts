import { PrismaClient } from '@prisma/client';
import { User } from '../../../../src/server/entities/User';
import { UserPrismaPostgresRepository } from '../../../../src/server/repositories/User/UserPrismaPostgresRepository';

describe('Repository: UserPrismaPostgres', () => {
  const prismaClientMock = {} as jest.MockedObject<PrismaClient>;
  const userPrismaMock = {
    create: jest.fn(),
    delete: jest.fn(),
    findUnique: jest.fn(),
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prismaClientMock.user = userPrismaMock as any;

  const userPrismaPostgresRepository = new UserPrismaPostgresRepository(prismaClientMock);

  describe('getByEmail', () => {
    const emailMock = 'email';

    it('Should return the user', async() => {
      userPrismaMock.findUnique.mockResolvedValue('user');

      const result = await userPrismaPostgresRepository.getByEmail(emailMock);

      expect(result).toBe('user');
      expect(userPrismaMock.findUnique).toHaveBeenCalled();
    });
  });

  describe('save', () => {
    const userMock = new User('email', 'provider', 'name');

    it('Should save a new user', async() => {
      await userPrismaPostgresRepository.save(userMock);

      expect(userPrismaMock.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          email: 'email',
          name: 'name',
        }),
      });
    });
  });

  describe('delete', () => {
    const userEmailMock = 'user email';

    it('Should delete a user', async() => {
      await userPrismaPostgresRepository.delete(userEmailMock);

      expect(userPrismaMock.delete).toHaveBeenCalledWith({
        where: {
          email: userEmailMock,
        },
      });
    });
  });
});
