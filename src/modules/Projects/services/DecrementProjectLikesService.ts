import { inject, injectable } from 'tsyringe';
import { Project } from '../entities/Project';
import { IProjectsRepository } from '../repositories/IProjectsRepository';

interface IRequest {
  id: string;
  userId: string;
}

@injectable()
export class DecrementProjectLikesService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository
  ) { }

  async execute({ id, userId }: IRequest): Promise<Project> {
    const likedProject = await this.projectsRepository.decrementLikes(id);

    let usersLikeArray = JSON.parse(likedProject.images);

    const index = usersLikeArray.findIndex(user => user.userId === userId);

    if (index !== -1) {
      usersLikeArray.splice(index, 1);
    }

    const updatedNews = await this.projectsRepository.update({
      ...likedProject,
      images: JSON.stringify(usersLikeArray),
    })

    return updatedNews;
  }
}

