import { NextApiRequest, NextApiResponse } from 'next';
import { UsersController } from '../../../server/controllers/UsersController';
import httpStatus from '../../../utils/httpStatus';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
): Promise<NextApiResponse | void> {
  if (request.method === 'DELETE') {
    return UsersController.delete(request, response);
  }

  return response.status(httpStatus.METHOD_NOT_ALLOWED).end();
}
