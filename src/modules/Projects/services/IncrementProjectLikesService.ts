import { inject, injectable } from 'tsyringe';
import { Project } from '../entities/Project';
import { IProjectsRepository } from '../repositories/IProjectsRepository';

interface IRequest {
  id: string;
  userId: string;
}

@injectable()
export class IncrementProjectLikesService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository
  ) { }

  async execute({ id, userId }: IRequest): Promise<Project> {
    const likedProject = await this.projectsRepository.incrementLikes(id);

    const usersLikeArray = JSON.parse(likedProject.images);

    if (!usersLikeArray.includes(userId)) {
      usersLikeArray.push({ userId });
    }

    const updatedProject = await this.projectsRepository.update({
      ...likedProject,
      images: JSON.stringify(usersLikeArray),
    })

    return updatedProject;
  }
}

