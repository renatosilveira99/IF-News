import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { IncrementNewsLikesService } from '../services/IncrementNewsLikesService';
import { plainToInstance } from 'class-transformer'
import { News } from '../entities/News';

export class IncrementNewsLikesController {
  async handle(request: Request, response: Response) {
    const { id } = request.body;

    const incrementNewsLikesService = container.resolve(IncrementNewsLikesService);

    const updatedNews = await incrementNewsLikesService.execute(id);

    return response.status(200).json(plainToInstance(News, updatedNews))
  }
}