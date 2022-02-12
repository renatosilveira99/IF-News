import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { plainToInstance } from 'class-transformer'
import { News } from '../entities/News';
import { FindNewsByCampusService } from '../services/FindNewsByCampusService';

export class FindNewsByCampusController {
  async handle(request: Request, response: Response) {
    const campus = request.query.campus as string;

    const findNewsByCampusService = container.resolve(FindNewsByCampusService);

    const news = await findNewsByCampusService.execute({ campus });

    return response.status(200).json(plainToInstance(News, news));
  }
}