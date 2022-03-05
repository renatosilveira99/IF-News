import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { IncrementProjectLikesService } from '../services/IncrementProjectLikesService';
import { plainToInstance } from 'class-transformer'
import { Project } from '../entities/Project';

export class IncrementProjectLikesController {
  async handle(request: Request, response: Response) {
    const { id, userId } = request.body;

    const incrementProjectLikesService = container.resolve(IncrementProjectLikesService);

    const updatedProject = await incrementProjectLikesService.execute({ id, userId });

    return response.status(200).json(plainToInstance(Project, updatedProject))
  }
}