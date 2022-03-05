import { inject, injectable } from 'tsyringe';
import AppError from "../../../utils/AppError";
import { Project } from '../entities/Project';
import { IProjectsRepository } from '../repositories/IProjectsRepository';

interface IRequest {
  id: string;
}

@injectable()
export class IncrementProjectViewsService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository
  ) { }

  async execute({ id }: IRequest): Promise<Project> {
    const updatedProject = this.projectsRepository.incrementViews(id);

    return updatedProject;
  }
}

