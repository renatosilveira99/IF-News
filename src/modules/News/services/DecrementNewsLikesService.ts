import { inject, injectable } from 'tsyringe';
import { News } from '../entities/News';
import { INewsRepository } from '../repositories/INewsRepository';

interface IRequest {
  id: string;
  userId: string;
}

@injectable()
export class DecrementNewsLikesService {
  constructor(
    @inject('NewsRepository')
    private newsRepository: INewsRepository
  ) { }

  async execute({ id, userId }: IRequest): Promise<News> {
    const likedNews = await this.newsRepository.decrementLikes(id);

    let usersLikeArray = JSON.parse(likedNews.images);

    if (usersLikeArray.includes(userId)) {
      usersLikeArray = usersLikeArray.splice(usersLikeArray.indexOf(userId), 1);
    }

    const updatedNews = await this.newsRepository.update({
      ...likedNews,
      images: JSON.stringify(usersLikeArray),
    })

    return updatedNews;
  }
}

