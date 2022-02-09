import { inject, injectable } from 'tsyringe';
import { IStorageProvider } from '../../../shared/container/StorageProvider/entities/IStorageProvider';
import { Project } from "../entities/Project";
import { IProjectsRepository } from '../repositories/IProjectsRepository';

interface IRequest {
  title: string;
  description: string;
  status: string;
  extraLink?: string;
  campus: string;
  authorId: string;
  coverImage: string;
}

@injectable()
export class CreateProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) { }


  async execute({ authorId, campus, description, status, title, extraLink, coverImage }: IRequest): Promise<Project> {
    const imageUrl = await this.storageProvider.saveFile(coverImage);

    const newProject = this.projectsRepository.create({
      authorId,
      campus,
      description,
      status,
      title,
      extraLink,
      coverImage: imageUrl
    });

    return newProject;
  }
}

