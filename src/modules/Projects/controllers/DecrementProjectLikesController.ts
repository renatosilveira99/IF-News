import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { DecrementProjectLikesService } from '../services/DecrementProjectLikesService';
import { plainToInstance } from 'class-transformer'
import { Project } from '../entities/Project';

export class DecrementProjectLikesController {
  async handle(request: Request, response: Response) {
    const { id, userId } = request.body;

    const decrementProjectLikesService = container.resolve(DecrementProjectLikesService);

    const updatedProject = await decrementProjectLikesService.execute({ id, userId });

    return response.status(200).json(plainToInstance(Project, updatedProject))
  }
}