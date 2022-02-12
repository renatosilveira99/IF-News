import { inject, injectable } from 'tsyringe';
import AppError from "../../../utils/AppError";
import { News } from "../entities/News";
import { INewsRepository } from '../repositories/INewsRepository';

interface IRequest {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  status: string;
  extraLink?: string;
  campus: string;
  authorId: string;
}

@injectable()
export class UpdateNewsService {
  constructor(
    @inject('NewsRepository')
    private newsRepository: INewsRepository
  ) { }

  async execute({ id, authorId, campus, description, status, title, subtitle, extraLink }: IRequest): Promise<News> {
    const newsExists = await this.newsRepository.findById(id);

    if (!newsExists) {
      throw new AppError('Notícia não encontrada', 400);
    }

    const updatedNews = this.newsRepository.update({
      ...newsExists,
      authorId,
      campus,
      description,
      status,
      title,
      subtitle,
      extraLink,
    });

    return updatedNews;
  }
}

