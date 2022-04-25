import { NextApiRequest, NextApiResponse } from 'next';
import { TasksController } from '../../../../server/controllers/TasksController';
import httpStatus from '../../../../utils/httpStatus';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
): Promise<NextApiResponse | void> {
  if (request.method === 'POST') {
    return TasksController.createToday(request, response);
  }

  return response.status(httpStatus.METHOD_NOT_ALLOWED).end();
}
