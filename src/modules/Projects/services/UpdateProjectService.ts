import { inject, injectable } from 'tsyringe';
import AppError from "../../../utils/AppError";
import { Project } from "../entities/Project";
import { IProjectsRepository } from '../repositories/IProjectsRepository';

interface IRequest {
  id: string;
  title: string;
  description: string;
  status: string;
  extraLink?: string;
  campus: string;
  authorId: string;
}

@injectable()
export class UpdateProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository
  ) { }


  async execute({ id, authorId, campus, description, status, title, extraLink }: IRequest): Promise<Project> {
    const projectExists = await this.projectsRepository.findById(id);

    if (!projectExists) {
      throw new AppError('Projeto não encontrado', 400);
    }

    const updatedProject = this.projectsRepository.update({
      ...projectExists,
      authorId,
      campus,
      description,
      status,
      title,
      extraLink,
    });

    return updatedProject;
  }
}

