import { inject, injectable } from 'tsyringe';
import { News } from "../entities/News";
import { INewsRepository } from '../repositories/INewsRepository';

@injectable()
export class FindAllNewsService {
  constructor(
    @inject('NewsRepository')
    private newsRepository: INewsRepository
  ) { }


  async execute(): Promise<News[]> {
    const news = await this.newsRepository.findAll();

    return news;
  }
}