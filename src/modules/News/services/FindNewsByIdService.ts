import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../../Users/repositories/IUsersRepository';
import { INewsRepository } from '../repositories/INewsRepository';

interface IRequest {
  id: string;
}

@injectable()
export class FindNewsByIdService {
  constructor(
    @inject('NewsRepository')
    private newsRepository: INewsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) { }


  async execute({ id }: IRequest): Promise<any> {
    const news = await this.newsRepository.findById(id)

    const author = await this.usersRepository.findById(news.authorId);

    return {
      news,
      author
    }
  }
}
