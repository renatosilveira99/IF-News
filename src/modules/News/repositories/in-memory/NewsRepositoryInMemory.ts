import { News } from '../../entities/News';
import { ICreateNewsDTO, INewsRepository, IUpdateNewsDTO } from '../INewsRepository';

export class NewsRepositoryInMemory implements INewsRepository {
  news: News[] = [];

  async findById(id: string): Promise<News> {
    const news = this.news.find(news => news.id === id);
    return news;
  }

  async findAll(): Promise<News[]> {
    return this.news;
  }

  async update({ id, title, subtitle, description, status, extraLink, campus, authorId, images }: IUpdateNewsDTO): Promise<News> {
    let newsToUpdateIndex = this.news.findIndex(foundNews => foundNews.id === id);

    this.news[newsToUpdateIndex].title = title;
    this.news[newsToUpdateIndex].subtitle = subtitle;
    this.news[newsToUpdateIndex].description = description;
    this.news[newsToUpdateIndex].status = status;
    this.news[newsToUpdateIndex].extraLink = extraLink;
    this.news[newsToUpdateIndex].campus = campus;
    this.news[newsToUpdateIndex].authorId = authorId;
    this.news[newsToUpdateIndex].images = images;

    return this.news[newsToUpdateIndex];
  }

  async findByAuthorId(authorId: string): Promise<News[]> {
    const news = this.news.filter(news => news.authorId === authorId);
    return news;
  }

  async findByCampus(campus: string): Promise<News[]> {
    const news = this.news.filter(news => news.campus === campus);
    return news;
  }

  async create({ title, subtitle, description, status, extraLink, campus, authorId, coverImage, views, likes }: ICreateNewsDTO): Promise<News> {
    const news = new News();

    Object.assign(news, {
      title,
      subtitle,
      description,
      status,
      extraLink,
      campus,
      authorId,
      coverImage,
      views,
      likes
    });

    this.news.push(news);

    return news;
  }

  async save(news: News): Promise<News> {
    const findIndex = this.news.findIndex(
      (findNews) => findNews.id === news.id,
    );

    this.news[findIndex] = news;
    return news;
  }

  async delete(id: string): Promise<void> {
    const findIndex = this.news.findIndex(
      (findNews) => findNews.id === id,
    );

    this.news.splice(findIndex, 1);
  }

  async incrementLikes(id: string): Promise<News> {
    const news = this.news.find(news => news.id === id);

    news.likes += 1;

    return news;
  }

  async decrementLikes(id: string): Promise<News> {
    const news = this.news.find(news => news.id === id);

    news.likes -= 1;

    return news;
  }

  async incrementViews(id: string): Promise<News> {
    const news = this.news.find(news => news.id === id);

    news.views += 1;

    return news;
  }
}
