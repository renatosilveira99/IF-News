import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { CreateProjectService } from '../services/CreateProjectService';
import { plainToInstance } from 'class-transformer'
import { Project } from '../entities/Project';

export class CreateProjectController {
  async handle(request: Request, response: Response) {
    const { campus, description, status, title, extraLink } = request.body
    const coverImage = request.file.filename
    const authorId = request.user.id

    const createProjectService = container.resolve(CreateProjectService);

    const createdProject = await createProjectService.execute({
      authorId,
      campus,
      description,
      status,
      title,
      extraLink,
      coverImage
    });

    return response.status(201).json(plainToInstance(Project, createdProject))
  }
}