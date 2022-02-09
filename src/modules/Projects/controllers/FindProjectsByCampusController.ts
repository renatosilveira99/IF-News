import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { plainToInstance } from 'class-transformer'
import { Project } from '../entities/Project';
import { FindProjectsByCampusService } from '../services/FindProjectsByCampusService';

export class FindProjectsByCampusController {
  async handle(request: Request, response: Response) {
    const campus = request.query.campus as string;

    const findProjectsByCampusService = container.resolve(FindProjectsByCampusService);

    const project = await findProjectsByCampusService.execute({ campus });

    return response.status(200).json(plainToInstance(Project, project));
  }
}