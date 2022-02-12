import { inject, injectable } from 'tsyringe';
import AppError from "../../../utils/AppError";
import { News } from "../entities/News";
import { INewsRepository } from '../repositories/INewsRepository';

interface IRequest {
  id: string;
}

@injectable()
export class FindNewsByIdService {
  constructor(
    @inject('NewsRepository')
    private newsRepository: INewsRepository
  ) { }


  async execute({ id }: IRequest): Promise<News> {
    const news = await this.newsRepository.findById(id)

    if (!news) {
      throw new AppError('Notícia não encontrada', 400);
    }

    return news;
  }
}
