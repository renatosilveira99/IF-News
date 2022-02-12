import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { UpdateNewsService } from '../services/UpdateNewsService';
import { plainToInstance } from 'class-transformer'
import { News } from '../entities/News';

export class UpdateNewsController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { campus, description, status, title, extraLink, subtitle } = request.body
    const authorId = request.user.id

    const updateNewsService = container.resolve(UpdateNewsService);

    const updatedNews = await updateNewsService.execute({
      id,
      authorId,
      campus,
      description,
      status,
      title,
      subtitle,
      extraLink,
    });

    return response.status(200).json(plainToInstance(News, updatedNews))
  }
}