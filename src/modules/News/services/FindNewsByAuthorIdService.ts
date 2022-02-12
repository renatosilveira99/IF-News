import { inject, injectable } from 'tsyringe';
import AppError from "../../../utils/AppError";
import { News } from "../entities/News";
import { INewsRepository } from '../repositories/INewsRepository';

interface IRequest {
  authorId: string;
}

@injectable()
export class FindNewsByAuthorIdService {
  constructor(
    @inject('NewsRepository')
    private newsRepository: INewsRepository
  ) { }


  async execute({ authorId }: IRequest): Promise<News[]> {
    const news = await this.newsRepository.findByAuthorId(authorId)

    if (news.length === 0) {
      throw new AppError('Notícia não encontrada', 400);
    }

    return news;
  }
}
