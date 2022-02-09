import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { plainToInstance } from 'class-transformer'
import { Project } from '../entities/Project';
import { FindProjectByAuthorIdService } from '../services/FindProjectsByAuthorIdService';

export class FindProjectsByAuthorIdController {
  async handle(request: Request, response: Response) {
    const { authorId } = request.params;

    const findProjectByAuthorIdService = container.resolve(FindProjectByAuthorIdService);

    const project = await findProjectByAuthorIdService.execute({ authorId });

    return response.status(200).json(plainToInstance(Project, project));
  }
}