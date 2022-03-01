import { EntityRepository, getRepository, Repository } from 'typeorm';

import { News } from '../../entities/News';
import { ICreateNewsDTO, INewsRepository, IUpdateNewsDTO } from '../INewsRepository';

@EntityRepository(News)
export class NewsRepository implements INewsRepository {
  private repository: Repository<News>;

  constructor() {
    this.repository = getRepository(News);
  }

  async findById(id: string): Promise<News> {
    const news = await this.repository.findOne({ id });

    return news;
  }

  async findByAuthorId(authorId: string): Promise<News[]> {
    const news = await this.repository.find({ authorId });

    return news;
  }

  async findByCampus(campus: string): Promise<News[]> {
    const news = await this.repository.find({ campus });

    return news;
  }

  async findAll(): Promise<News[]> {
    const news = await this.repository.find();

    return news;
  }

  async update({
    id,
    title,
    description,
    authorId,
    campus,
    status,
    extraLink,
    subtitle
  }: IUpdateNewsDTO): Promise<News> {
    const newsToUpdate = await this.repository.findOne({ id });

    newsToUpdate.title = title;
    newsToUpdate.subtitle = subtitle;
    newsToUpdate.description = description;
    newsToUpdate.authorId = authorId;
    newsToUpdate.campus = campus;
    newsToUpdate.status = status;
    newsToUpdate.extraLink = extraLink;

    await this.repository.save(newsToUpdate);

    return newsToUpdate;
  }

  async create({
    title,
    subtitle,
    description,
    authorId,
    campus,
    status,
    extraLink,
    coverImage,
    views,
    likes
  }: ICreateNewsDTO): Promise<News> {
    const news = this.repository.create({
      title,
      subtitle,
      description,
      authorId,
      campus,
      status,
      extraLink,
      coverImage,
      views,
      likes
    });

    await this.repository.save(news);

    return news
  }

  async save(news: News): Promise<News> {
    await this.repository.save(news);
    return news;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async incrementLikes(id: string): Promise<void> {
    const news = await this.repository.findOne({ id });

    const likes = news.likes++;

    await this.repository.save({ ...news, likes });
  }

  async incrementViews(id: string): Promise<void> {
    const news = await this.repository.findOne({ id });

    news.views = Number(news.views + 1);

    await this.repository.save(news);
  }

  async decrementLikes(id: string): Promise<void> {
    const news = await this.repository.findOne({ id });

    await this.repository.save(news);
  }
}

