import { User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { UsersController } from '../../../src/server/controllers/UsersController';
import { UserPrismaPostgresRepository } from '../../../src/server/repositories/User/UserPrismaPostgresRepository';
import httpStatus from '../../../src/utils/httpStatus';

jest.mock('@prisma/client');
jest.mock('../../../src/server/repositories/Task/TaskPrismaPostgresRepository');
jest.mock('../../../src/server/repositories/Daily/DailyPrismaPostgresRepository');

describe('Controller: Tasks', () => {
  const requestMock = {} as NextApiRequest;
  const responseMock = {} as NextApiResponse;
  const responseJsonSpy = jest.fn();
  const endResponseMock = jest.fn();
  const statusMock = jest.fn().mockReturnValue({
    end: endResponseMock,
    json: responseJsonSpy,
  });

  requestMock.query = { email: 'email' };

  responseMock.status = statusMock;
  responseMock.json = responseJsonSpy;

  const getByEmailUserRepositorySpy = jest.spyOn(UserPrismaPostgresRepository.prototype, 'getByEmail');

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('checkIfUserExists', () => {
    it('Should response status 200 when user exists', async() => {
      getByEmailUserRepositorySpy.mockResolvedValueOnce('user' as unknown as User);
      await UsersController.checkIfUserExists(requestMock, responseMock);

      expect(responseMock.status).toHaveBeenCalledWith(httpStatus.OK);
    });

    it('Should response status 404 when user not exists', async() => {
      getByEmailUserRepositorySpy.mockResolvedValueOnce(null);
      await UsersController.checkIfUserExists(requestMock, responseMock);

      expect(responseMock.status).toHaveBeenCalledWith(httpStatus.NOT_FOUND);
    });
  });
});
