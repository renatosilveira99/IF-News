
import { Project } from '../entities/Project';

interface ICreateProjectDTO {
  title: string;
  description: string;
  status: string;
  extraLink?: string;
  campus: string;
  authorId: string;
  coverImage: string;
}

interface IUpdateProjectDTO {
  id: string;
  title: string;
  description: string;
  status: string;
  extraLink?: string;
  campus: string;
  authorId: string;
  coverImage: string;
  images?: string[];
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


interface IProjectsRepository {
  create({ title, description, status, extraLink, campus, authorId, coverImage }: ICreateProjectDTO): Promise<Project>;
  findAll(): Promise<Project[]>;
  findById(id: string): Promise<Project>;
  findByAuthorId(authorId: string): Promise<Project[]>;
  findByCampus(campus: string): Promise<Project[]>;
  update({ id, title, description, status, extraLink, campus, authorId, coverImage, images }: IUpdateProjectDTO): Promise<Project>;
  save(project: Project): Promise<Project>;
}

export { IProjectsRepository, ICreateProjectDTO, IUpdateProjectDTO, ImageFile };
