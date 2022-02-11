import { inject, injectable } from 'tsyringe';
import { IStorageProvider } from '../../../shared/container/StorageProvider/entities/IStorageProvider';
import AppError from '../../../utils/AppError';
import { Project } from "../entities/Project";
import { IProjectsRepository } from '../repositories/IProjectsRepository';

interface IRequest {
  id: string;
}

@injectable()
export class DeleteProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) { }


  async execute({ id }: IRequest): Promise<void> {
    const project = await this.projectsRepository.findById(id);

    if (!project) {
      throw new AppError('Projeto não encontrado', 400);
    }

    const { coverImage } = project;
    const { images } = project;

    console.log(coverImage);
    console.log(images);

    if (coverImage) {
      await this.storageProvider.deleteFile(coverImage);
    }

    if (images) {
      const parsedImages = JSON.parse(images);

      await parsedImages.forEach(async (image: string) => {
        await this.storageProvider.deleteFile(image);
      });
    }

    await this.projectsRepository.delete(id);
  }
}

