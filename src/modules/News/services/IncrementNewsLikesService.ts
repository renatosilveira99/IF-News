import { inject, injectable } from 'tsyringe';
import AppError from "../../../utils/AppError";
import { INewsRepository } from '../repositories/INewsRepository';

interface IRequest {
  id: string;
}

@injectable()
export class IncrementNewsLikesService {
  constructor(
    @inject('NewsRepository')
    private newsRepository: INewsRepository
  ) { }

  async execute({ id }: IRequest): Promise<void> {
    const updatedNews = this.newsRepository.incrementLikes(id);

    return updatedNews;
  }
}

