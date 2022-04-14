import { NextApiRequest, NextApiResponse } from 'next';
import { TasksController } from '../../../../server/controllers/TasksController';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
): Promise<NextApiResponse | void> {
  if (request.method === 'DELETE') {
    return TasksController.delete(request, response);
  }

  return response.status(405).end();
}