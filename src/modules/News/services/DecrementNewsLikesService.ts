import { inject, injectable } from 'tsyringe';
import AppError from "../../../utils/AppError";
import { News } from '../entities/News';
import { INewsRepository } from '../repositories/INewsRepository';

interface IRequest {
  id: string;
}

@injectable()
export class DecrementNewsLikesService {
  constructor(
    @inject('NewsRepository')
    private newsRepository: INewsRepository
  ) { }

  async execute({ id }: IRequest): Promise<News> {
    const updatedNews = await this.newsRepository.decrementLikes(id);

    return updatedNews;
  }
}

