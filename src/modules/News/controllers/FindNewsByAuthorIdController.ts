import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { plainToInstance } from 'class-transformer'
import { News } from '../entities/News';
import { FindNewsByAuthorIdService } from '../services/FindNewsByAuthorIdService';

export class FindNewsByAuthorIdController {
  async handle(request: Request, response: Response) {
    const { authorId } = request.params;

    const findNewsByAuthorIdService = container.resolve(FindNewsByAuthorIdService);

    const news = await findNewsByAuthorIdService.execute({ authorId });

    return response.status(200).json(plainToInstance(News, news));
  }
}