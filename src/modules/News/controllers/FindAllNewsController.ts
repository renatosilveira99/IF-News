import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { plainToInstance } from 'class-transformer'
import { News } from '../entities/News';
import { FindAllNewsService } from '../services/FindAllNewsService';

export class FindAllNewsController {
  async handle(request: Request, response: Response) {
    const findAllNewsService = container.resolve(FindAllNewsService);

    const news = await findAllNewsService.execute();

    return response.status(200).json(plainToInstance(News, news));
  }
}