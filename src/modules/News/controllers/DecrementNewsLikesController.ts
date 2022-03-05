import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { DecrementNewsLikesService } from '../services/DecrementNewsLikesService';
import { plainToInstance } from 'class-transformer'
import { News } from '../entities/News';

export class DecrementNewsLikesController {
  async handle(request: Request, response: Response) {
    const { id, userId } = request.body;

    const decrementNewsLikesService = container.resolve(DecrementNewsLikesService);

    const updatedNews = await decrementNewsLikesService.execute({
      id,
      userId,
    });

    return response.status(200).json(plainToInstance(News, updatedNews))
  }
}