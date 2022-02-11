import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { UpdateProjectService } from '../services/UpdateProjectService';
import { plainToInstance } from 'class-transformer'
import { Project } from '../entities/Project';

export class UpdateProjectController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { campus, description, status, title, extraLink } = request.body
    const authorId = request.user.id

    const updateProjectService = container.resolve(UpdateProjectService);

    const updatedProject = await updateProjectService.execute({
      id,
      authorId,
      campus,
      description,
      status,
      title,
      extraLink,
    });

    return response.status(200).json(plainToInstance(Project, updatedProject))
  }
}