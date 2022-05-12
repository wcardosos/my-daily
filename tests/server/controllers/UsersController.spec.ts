import { User as UserPrisma } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { UsersController } from '../../../src/server/controllers/UsersController';
import { User } from '../../../src/server/entities/User';
import { UserPrismaPostgresRepository } from '../../../src/server/repositories/User/UserPrismaPostgresRepository';
import httpStatus from '../../../src/utils/httpStatus';

jest.mock('@prisma/client');
jest.mock('../../../src/server/repositories/Task/TaskPrismaPostgresRepository');
jest.mock('../../../src/server/repositories/Daily/DailyPrismaPostgresRepository');
jest.mock('../../../src/server/repositories/User/UserPrismaPostgresRepository');

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
  const saveUserRepositorySpy = jest.spyOn(UserPrismaPostgresRepository.prototype, 'save');
  const deleteUserRepositorySpy = jest.spyOn(UserPrismaPostgresRepository.prototype, 'delete');

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('checkIfUserExists', () => {
    it('Should response status 200 when user exists', async() => {
      getByEmailUserRepositorySpy.mockResolvedValueOnce('user' as unknown as UserPrisma);
      await UsersController.checkIfUserExists(requestMock, responseMock);

      expect(responseMock.status).toHaveBeenCalledWith(httpStatus.OK);
    });

    it('Should response status 404 when user not exists', async() => {
      getByEmailUserRepositorySpy.mockResolvedValueOnce(null);
      await UsersController.checkIfUserExists(requestMock, responseMock);

      expect(responseMock.status).toHaveBeenCalledWith(httpStatus.NOT_FOUND);
    });
  });

  describe('create', () => {
    requestMock.body = {
      email: 'email',
      name: 'name',
      pictureUrl: 'picture',
      provider: 'provider',
    };

    it('Should create a new user', async() => {
      await UsersController.create(requestMock, responseMock);

      expect(saveUserRepositorySpy).toHaveBeenCalledWith(expect.any(User));
      expect(responseMock.status).toHaveBeenCalledWith(httpStatus.CREATED);
    });
  });

  describe('delete', () => {
    it('Should delete a user', async() => {
      await UsersController.delete(requestMock, responseMock);

      expect(deleteUserRepositorySpy).toHaveBeenCalledWith('email');
      expect(responseMock.status).toHaveBeenCalledWith(httpStatus.ACCEPTED);
    });
  });
});
