import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../../Users/repositories/IUsersRepository';
import { IProjectsRepository } from '../repositories/IProjectsRepository';

interface IRequest {
  id: string;
}

@injectable()
export class FindProjectByIdService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) { }


  async execute({ id }: IRequest): Promise<any> {
    const project = await this.projectsRepository.findById(id)

    const author = await this.usersRepository.findById(project.authorId);

    return {
      project,
      author
    }
  }
}
