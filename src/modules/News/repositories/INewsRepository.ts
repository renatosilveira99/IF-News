
import { News } from '../entities/News';

interface ICreateNewsDTO {
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
}

interface IUpdateNewsDTO {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  status: string;
  extraLink?: string;
  campus: string;
  authorId: string;
  coverImage: string;
  images?: string[] | string;
}

interface ImageFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

interface INewsRepository {
  create({ title, subtitle, description, status, extraLink, campus, authorId, coverImage, views, likes }: ICreateNewsDTO): Promise<News>;
  findAll(): Promise<News[]>;
  findById(id: string): Promise<News>;
  findByAuthorId(authorId: string): Promise<News[]>;
  findByCampus(campus: string): Promise<News[]>;
  update({ id, title, subtitle, description, status, extraLink, campus, authorId, coverImage, images }: IUpdateNewsDTO): Promise<News>;
  save(news: News): Promise<News>;
  delete(id: string): Promise<void>;
  incrementLikes(id: string): Promise<void>;
  incrementViews(id: string): Promise<void>;
  decrementLikes(id: string): Promise<void>;
}

export { INewsRepository, ICreateNewsDTO, IUpdateNewsDTO, ImageFile };
