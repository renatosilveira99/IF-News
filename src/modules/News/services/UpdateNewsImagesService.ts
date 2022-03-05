import { inject, injectable } from 'tsyringe';
import { IStorageProvider } from '../../../shared/container/StorageProvider/entities/IStorageProvider';
import AppError from '../../../utils/AppError';
import { News } from "../entities/News";
import { ImageFile, INewsRepository } from '../repositories/INewsRepository';

interface IRequest {
  id: string;
  images: ImageFile[]
}

@injectable()
export class UpdateNewsImagesService {
  constructor(
    @inject('NewsRepository')
    private newsRepository: INewsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) { }


  async execute({ id, images }: IRequest): Promise<News> {
    const news = await this.newsRepository.findById(id);

    if (!news) {
      throw new AppError('Notícia não encontrada', 404);
    }

    if (news.images) {
      const imagesToDelete: Array<string> = JSON.parse(news.images);

      await Promise.all(imagesToDelete.map(async (image) => {
        await this.storageProvider.deleteFile(image)
      }))
    }

    const imageUrls = await Promise.all(images.map(async image => {
      const fileName = await this.storageProvider.saveFile(image.filename);

      return fileName;
    }));

    const updatedNews = await this.newsRepository.update({
      ...news,
      images: JSON.stringify(imageUrls),
    });

    updatedNews.images = JSON.stringify(imageUrls);

    await this.newsRepository.save(updatedNews);

    return updatedNews;
  }
}

