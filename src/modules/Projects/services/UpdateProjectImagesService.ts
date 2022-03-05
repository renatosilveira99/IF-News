import { inject, injectable } from 'tsyringe';
import { IStorageProvider } from '../../../shared/container/StorageProvider/entities/IStorageProvider';
import AppError from '../../../utils/AppError';
import { Project } from "../entities/Project";
import { ImageFile, IProjectsRepository } from '../repositories/IProjectsRepository';

interface IRequest {
  id: string;
  images: ImageFile[]
}

@injectable()
export class UpdateProjectImagesService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) { }


  async execute({ id, images }: IRequest): Promise<Project> {
    const project = await this.projectsRepository.findById(id);

    if (!project) {
      throw new AppError('Projeto não encontrado', 404);
    }

    if (project.images) {
      const imagesToDelete: Array<string> = JSON.parse(project.images);

      await Promise.all(imagesToDelete.map(async (image) => {
        await this.storageProvider.deleteFile(image)
      }))
    }

    const imageUrls = await Promise.all(images.map(async image => {
      const fileName = await this.storageProvider.saveFile(image.filename);

      return fileName;
    }));

    const updatedProject = await this.projectsRepository.update({
      ...project,
      images: JSON.stringify(imageUrls),
    });

    updatedProject.images = JSON.stringify(imageUrls);

    await this.projectsRepository.save(updatedProject);

    return updatedProject;
  }
}

