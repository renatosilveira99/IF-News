import { inject, injectable } from 'tsyringe';
import AppError from "../../../utils/AppError";
import { IProjectsRepository } from '../repositories/IProjectsRepository';

interface IRequest {
  id: string;
}

@injectable()
export class IncrementProjectLikesService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository
  ) { }

  async execute({ id }: IRequest): Promise<void> {
    const updatedProject = this.projectsRepository.incrementLikes(id);

    return updatedProject;
  }
}

