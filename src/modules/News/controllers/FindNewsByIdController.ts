import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { FindNewsByIdService } from '../services/FindNewsByIdService';

export class FindNewsByIdController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const findNewsByIdService = container.resolve(FindNewsByIdService);

    const { news, author } = await findNewsByIdService.execute({ id });

    return response.status(200).json({ news, author });
  }
}