import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { UpdateNewsImagesService } from '../services/UpdateNewsImagesService';
import { plainToInstance } from 'class-transformer'
import { News } from '../entities/News';
import { ImageFile } from '../repositories/INewsRepository';

export class UpdateNewsImagesController {
  async handle(request: Request, response: Response) {
    const { id } = request.params
    const images = request.files as ImageFile[]

    const updateNewsImagesService = container.resolve(UpdateNewsImagesService);

    const updatedNews = await updateNewsImagesService.execute({
      id,
      images
    });

    return response.json(plainToInstance(News, updatedNews));
  }
}