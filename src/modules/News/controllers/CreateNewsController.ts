import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { CreateNewsService } from '../services/CreateNewsService';
import { plainToInstance } from 'class-transformer'
import { News } from '../entities/News';

export class CreateNewsController {
  async handle(request: Request, response: Response) {
    const { campus, description, status, title, extraLink, views, likes, subtitle } = request.body
    const coverImage = request.file.filename
    const authorId = request.user.id

    console.log("REQUEST ++++++++++++++++++++++++++")
    console.log(request);

    const createNewsService = container.resolve(CreateNewsService);

    const createdNews = await createNewsService.execute({
      authorId,
      campus,
      description,
      status,
      title,
      subtitle,
      extraLink,
      coverImage,
      views,
      likes
    });

    return response.status(201).json(plainToInstance(News, createdNews))
  }
}