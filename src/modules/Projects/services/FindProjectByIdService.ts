import { inject, injectable } from 'tsyringe';
import AppError from "../../../utils/AppError";
import { Project } from "../entities/Project";
import { IProjectsRepository } from '../repositories/IProjectsRepository';

interface IRequest {
  id: string;
}

@injectable()
export class FindProjectByIdService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository
  ) { }


  async execute({ id }: IRequest): Promise<Project> {
    const project = await this.projectsRepository.findById(id)

    if (!project) {
      throw new AppError('Projeto não encontrado', 400);
    }

    return project;
  }
}
