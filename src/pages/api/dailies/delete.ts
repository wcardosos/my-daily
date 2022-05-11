import { NextApiRequest, NextApiResponse } from 'next';
import { DailiesController } from '../../../server/controllers/DailiesController';
import httpStatus from '../../../utils/httpStatus';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
): Promise<NextApiResponse | void> {
  if (request.method === 'DELETE') {
    return DailiesController.deleteByUser(request, response);
  }

  return response.status(httpStatus.METHOD_NOT_ALLOWED).end();
}
