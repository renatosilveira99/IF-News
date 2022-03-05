import { inject, injectable } from 'tsyringe';
import { IStorageProvider } from '../../../shared/container/StorageProvider/entities/IStorageProvider';
import { News } from "../entities/News";
import { INewsRepository } from '../repositories/INewsRepository';

interface IRequest {
  title: string;
  subtitle: string;
  description: string;
  status: string;
  extraLink?: string;
  campus: string;
  authorId: string;
  coverImage: string;
  views: number;
  likes: number;
  images: string;
}

@injectable()
export class CreateNewsService {
  constructor(
    @inject('NewsRepository')
    private newsRepository: INewsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) { }


  async execute({ authorId, campus, description, status, title, subtitle, extraLink, coverImage, views, likes }: IRequest): Promise<News> {
    const imageUrl = await this.storageProvider.saveFile(coverImage);

    const newNews = this.newsRepository.create({
      subtitle,
      authorId,
      campus,
      description,
      status,
      title,
      extraLink,
      coverImage: imageUrl,
      views,
      likes,
      images: '[]',
    });

    return newNews;
  }
}

