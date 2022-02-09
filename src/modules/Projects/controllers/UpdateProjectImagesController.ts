import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { UpdateProjectImagesService } from '../services/UpdateProjectImagesService';
import { plainToInstance } from 'class-transformer'
import { Project } from '../entities/Project';
import { ImageFile } from '../repositories/IProjectsRepository';

export class UpdateProjectImagesController {
  async handle(request: Request, response: Response) {
    const { id } = request.body
    const images = request.files as ImageFile[]

    const updateProjectImagesService = container.resolve(UpdateProjectImagesService);

    const updatedProject = await updateProjectImagesService.execute({
      id,
      images
    });

    return response.json(plainToInstance(Project, updatedProject));
  }
}