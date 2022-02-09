import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { plainToInstance } from 'class-transformer'
import { Project } from '../entities/Project';
import { FindProjectByIdService } from '../services/FindProjectByIdService';

export class FindProjectByIdController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const findProjectByIdService = container.resolve(FindProjectByIdService);

    const project = await findProjectByIdService.execute({ id });

    return response.status(200).json(plainToInstance(Project, project));
  }
}