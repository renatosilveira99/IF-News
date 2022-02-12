import { inject, injectable } from 'tsyringe';
import AppError from "../../../utils/AppError";
import { News } from "../entities/News";
import { INewsRepository } from '../repositories/INewsRepository';

interface IRequest {
  campus: string;
}

@injectable()
export class FindNewsByCampusService {
  constructor(
    @inject('NewsRepository')
    private newsRepository: INewsRepository
  ) { }


  async execute({ campus }: IRequest): Promise<News[]> {
    const news = await this.newsRepository.findByCampus(campus)

    if (news.length === 0) {
      throw new AppError('Notícia não encontrada', 400);
    }

    return news;
  }
}
