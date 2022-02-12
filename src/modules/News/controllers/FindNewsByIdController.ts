import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { plainToInstance } from 'class-transformer'
import { News } from '../entities/News';
import { FindNewsByIdService } from '../services/FindNewsByIdService';

export class FindNewsByIdController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const findNewsByIdService = container.resolve(FindNewsByIdService);

    const news = await findNewsByIdService.execute({ id });

    return response.status(200).json(plainToInstance(News, news));
  }
}