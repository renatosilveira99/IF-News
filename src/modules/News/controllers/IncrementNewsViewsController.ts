import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { IncrementNewsViewsService } from '../services/IncrementNewsViewsService';
import { plainToInstance } from 'class-transformer'
import { News } from '../entities/News';

export class IncrementNewsViewsController {
  async handle(request: Request, response: Response) {
    const { id } = request.body;

    const incrementNewsViewsService = container.resolve(IncrementNewsViewsService);

    const updatedNews = await incrementNewsViewsService.execute(id);

    return response.status(200).json(plainToInstance(News, updatedNews))
  }
}