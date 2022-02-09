import { inject, injectable } from 'tsyringe';
import AppError from "../../../utils/AppError";
import { Project } from "../entities/Project";
import { IProjectsRepository } from '../repositories/IProjectsRepository';

interface IRequest {
  campus: string;
}

@injectable()
export class FindProjectsByCampusService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository
  ) { }


  async execute({ campus }: IRequest): Promise<Project[]> {
    const project = await this.projectsRepository.findByCampus(campus)

    if (project.length === 0) {
      throw new AppError('Projeto não encontrado', 400);
    }

    return project;
  }
}
