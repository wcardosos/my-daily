import { PrismaClient } from '@prisma/client';
import { DateHandler } from '../../../../src/server/providers/DateHandler';
import { DailyPrismaPostgresRepository } from '../../../../src/server/repositories/Daily/DailyPrismaPostgresRepository';

describe('Repository: DailyPrismaPostgres', () => {
  const prismaClientMock = {} as jest.MockedObject<PrismaClient>;
  const dailyPrismaMock = {
    create: jest.fn(),
    findUnique: jest.fn(),
  };
  const getTodayDateHandlerSpy = jest.spyOn(DateHandler, 'getToday');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prismaClientMock.daily = dailyPrismaMock as any;

  const dailyPrismaPostgresRepository = new DailyPrismaPostgresRepository(prismaClientMock);

  describe('getToday', () => {
    getTodayDateHandlerSpy.mockReturnValue('id');

    it('Should return the id when the daily exists', async() => {
      dailyPrismaMock.findUnique.mockResolvedValue({ id: 'daily id' });

      const result = await dailyPrismaPostgresRepository.getToday();

      expect(dailyPrismaMock.findUnique).toHaveBeenCalledWith({ where: { id: 'id' } });
      expect(result).toBe('daily id');
    });

    it('Should return null when the daily not exists', async() => {
      dailyPrismaMock.findUnique.mockResolvedValue(null);

      const result = await dailyPrismaPostgresRepository.getToday();

      expect(dailyPrismaMock.findUnique).toHaveBeenCalledWith({ where: { id: 'id' } });
      expect(result).toBeNull();
    });
  });

  describe('saveToday', () => {
    getTodayDateHandlerSpy.mockReturnValue('id');

    it('Should create the today daily', async() => {
      await dailyPrismaPostgresRepository.saveToday('user');

      expect(dailyPrismaMock.create).toHaveBeenCalledWith({ data: expect.objectContaining({ user_id: 'user' }) });
    });
  });
});
