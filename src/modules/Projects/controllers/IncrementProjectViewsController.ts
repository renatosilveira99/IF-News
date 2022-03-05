import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { IncrementProjectViewsService } from '../services/IncrementProjectViewsService';
import { plainToInstance } from 'class-transformer'
import { Project } from '../entities/Project';

export class IncrementProjectViewsController {
  async handle(request: Request, response: Response) {
    const { id } = request.body;

    const incrementProjectViewsService = container.resolve(IncrementProjectViewsService);

    const updatedProject = await incrementProjectViewsService.execute({ id });

    return response.status(200).json(plainToInstance(Project, updatedProject))
  }
}