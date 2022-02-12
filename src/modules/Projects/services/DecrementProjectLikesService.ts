import { inject, injectable } from 'tsyringe';
import AppError from "../../../utils/AppError";
import { IProjectsRepository } from '../repositories/IProjectsRepository';

interface IRequest {
  id: string;
}

@injectable()
export class DecrementProjectLikesService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository
  ) { }

  async execute({ id }: IRequest): Promise<void> {
    const project = await this.projectsRepository.findById(id);

    if (!project) {
      throw new AppError('Projeto não encontrado', 400);
    }

    const updatedProject = this.projectsRepository.decrementLikes(id);

    return updatedProject;
  }
}

