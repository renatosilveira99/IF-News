import { inject, injectable } from 'tsyringe';
import AppError from "../../../utils/AppError";
import { Project } from "../entities/Project";
import { IProjectsRepository } from '../repositories/IProjectsRepository';

interface IRequest {
  authorId: string;
}

@injectable()
export class FindProjectByAuthorIdService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository
  ) { }


  async execute({ authorId }: IRequest): Promise<Project[]> {
    const project = await this.projectsRepository.findByAuthorId(authorId)

    return project;
  }
}
