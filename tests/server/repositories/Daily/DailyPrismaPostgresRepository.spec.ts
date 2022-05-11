import { PrismaClient } from '@prisma/client';
import { DateHandler } from '../../../../src/server/providers/DateHandler';
import { DailyPrismaPostgresRepository } from '../../../../src/server/repositories/Daily/DailyPrismaPostgresRepository';

describe('Repository: DailyPrismaPostgres', () => {
  const prismaClientMock = {} as jest.MockedObject<PrismaClient>;
  const dailyPrismaMock = {
    create: jest.fn(),
    findFirst: jest.fn(),
    deleteMany: jest.fn(),
  };
  const getTodayDateHandlerSpy = jest.spyOn(DateHandler, 'getToday');
  getTodayDateHandlerSpy.mockReturnValue('date');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prismaClientMock.daily = dailyPrismaMock as any;

  const dailyPrismaPostgresRepository = new DailyPrismaPostgresRepository(prismaClientMock);

  describe('getIdByDate', () => {
    const dateMock = 'date';
    const userEmailMock = 'email';

    it('Should return the daily id', async() => {
      dailyPrismaMock.findFirst.mockResolvedValueOnce({ id: 'daily id' });

      const result = await dailyPrismaPostgresRepository.getIdByDate(dateMock, userEmailMock);

      expect(dailyPrismaMock.findFirst).toHaveBeenCalledWith({
        where: {
          date: 'date',
          user: {
            email: 'email',
          },
        },
      });
      expect(result).toBe('daily id');
    });

    it('Should return null when the daily does not exists', async() => {
      dailyPrismaMock.findFirst.mockResolvedValueOnce(null);

      const result = await dailyPrismaPostgresRepository.getIdByDate(dateMock, userEmailMock);

      expect(result).toBeNull();
    });
  });

  describe('getToday', () => {
    it('Should return the id when the daily exists', async() => {
      dailyPrismaMock.findFirst.mockResolvedValue({ id: 'daily id' });

      const result = await dailyPrismaPostgresRepository.getToday('user');

      expect(dailyPrismaMock.findFirst).toHaveBeenCalledWith({
        where: {
          date: 'date',
          user: { email: 'user' },
        },
      });
      expect(result).toBe('daily id');
    });

    it('Should return null when the daily not exists', async() => {
      dailyPrismaMock.findFirst.mockResolvedValue(null);

      const result = await dailyPrismaPostgresRepository.getToday('user');

      expect(dailyPrismaMock.findFirst).toHaveBeenCalledWith({
        where: {
          date: 'date',
          user: { email: 'user' },
        },
      });
      expect(result).toBeNull();
    });
  });

  describe('saveToday', () => {
    dailyPrismaMock.create.mockResolvedValue({ id: 'daily id' });

    it('Should create the today daily', async() => {
      await dailyPrismaPostgresRepository.saveToday('user');

      expect(dailyPrismaMock.create).toHaveBeenCalledWith({ data: expect.objectContaining({ user_id: 'user' }) });
    });
  });

  describe('deleteAllByUser', () => {
    const userEmailMock = 'user email';

    it('Should delete all user\'s dailies', async() => {
      await dailyPrismaPostgresRepository.deleteAllByUser(userEmailMock);

      expect(dailyPrismaMock.deleteMany).toHaveBeenCalledWith({
        where: {
          user: {
            email: userEmailMock,
          },
        },
      });
    });
  });
});
