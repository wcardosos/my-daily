import { NextApiRequest, NextApiResponse } from 'next';
import { DailiesController } from '../../../src/server/controllers/DailiesController';
import { DailyPrismaPostgresRepository } from '../../../src/server/repositories/Daily/DailyPrismaPostgresRepository';

jest.mock('@prisma/client');
jest.mock('../../../src/server/repositories/Daily/DailyPrismaPostgresRepository');

describe('Controller: Dailies', () => {
  const requestMock = {} as NextApiRequest;
  const responseMock = {} as NextApiResponse;
  const responseJsonSpy = jest.fn();
  const endResponseMock = jest.fn();
  const statusMock = jest.fn().mockReturnValue({
    end: endResponseMock,
    json: responseJsonSpy,
  });

  requestMock.query = { userEmail: 'user email' };

  responseMock.status = statusMock;
  responseMock.json = responseJsonSpy;

  const deleteAllByUserRepositorySpy = jest.spyOn(DailyPrismaPostgresRepository.prototype, 'deleteAllByUser');

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('deleteByUser', () => {
    it('Should delete the user\'s dailies', async() => {
      await DailiesController.deleteByUser(requestMock, responseMock);

      expect(deleteAllByUserRepositorySpy).toHaveBeenCalledWith('user email');
    });
  });
});
