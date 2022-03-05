import { inject, injectable } from 'tsyringe';
import { News } from '../entities/News';
import { INewsRepository } from '../repositories/INewsRepository';

interface IRequest {
  id: string;
  userId: string;
}

@injectable()
export class IncrementNewsLikesService {
  constructor(
    @inject('NewsRepository')
    private newsRepository: INewsRepository,
  ) { }

  async execute({ id, userId }: IRequest): Promise<News> {
    const likedNews = await this.newsRepository.incrementLikes(id);

    const usersLikeArray = JSON.parse(likedNews.images);

    if (!usersLikeArray.includes(userId)) {
      usersLikeArray.push({ userId });
    }

    const updatedNews = await this.newsRepository.update({
      ...likedNews,
      images: JSON.stringify(usersLikeArray),
    })

    return updatedNews;
  }
}

