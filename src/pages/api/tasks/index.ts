import { NextApiRequest, NextApiResponse } from 'next';
import { TasksController } from '../../../server/controllers/TasksController';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
): Promise<NextApiResponse | void> {
  if (request.method === 'POST') {
    return TasksController.create(request, response);
  }
  if (request.method === 'GET') {
    return TasksController.getByDaily(request, response);
  }

  return response.status(405);
}
