import { inject, injectable } from 'tsyringe';
import { IStorageProvider } from '../../../shared/container/StorageProvider/entities/IStorageProvider';
import AppError from '../../../utils/AppError';
import { INewsRepository } from '../repositories/INewsRepository';

interface IRequest {
  id: string;
}

@injectable()
export class DeleteNewsService {
  constructor(
    @inject('NewsRepository')
    private newsRepository: INewsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) { }


  async execute({ id }: IRequest): Promise<void> {
    const news = await this.newsRepository.findById(id);

    if (!news) {
      throw new AppError('Notícia não encontrada', 400);
    }

    const { coverImage } = news;
    const { images } = news;

    if (coverImage) {
      await this.storageProvider.deleteFile(coverImage);
    }

    if (images) {
      const parsedImages = JSON.parse(images);

      await parsedImages.forEach(async (image: string) => {
        await this.storageProvider.deleteFile(image);
      });
    }

    await this.newsRepository.delete(id);
  }
}

