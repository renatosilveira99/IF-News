import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { plainToInstance } from 'class-transformer'
import { Project } from '../entities/Project';
import { FindAllProjectsService } from '../services/FindAllProjectsService';

export class FindAllProjectsController {
  async handle(request: Request, response: Response) {
    const findAllProjectsService = container.resolve(FindAllProjectsService);

    const projects = await findAllProjectsService.execute();

    return response.status(200).json(plainToInstance(Project, projects));
  }
}