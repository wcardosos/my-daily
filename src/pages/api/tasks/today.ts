import { NextApiRequest, NextApiResponse } from 'next';
import { TasksController } from '../../../server/controllers/TasksController';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
): Promise<NextApiResponse | void> {
  if (request.method === 'GET') {
    return TasksController.getToday(request, response);
  }

  return response.status(405).end();
}
