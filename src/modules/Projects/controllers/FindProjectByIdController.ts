import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { FindProjectByIdService } from '../services/FindProjectByIdService';

export class FindProjectByIdController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const findProjectByIdService = container.resolve(FindProjectByIdService);

    const { project, author } = await findProjectByIdService.execute({ id });

    return response.status(200).json({
      project,
      author
    });
  }
}