import { EntityRepository, getRepository, Repository } from 'typeorm';

import { Project } from '../../entities/Project';
import { ICreateProjectDTO, IProjectsRepository, IUpdateProjectDTO } from '../IProjectsRepository';

@EntityRepository(Project)
export class ProjectsRepository implements IProjectsRepository {
  private repository: Repository<Project>;

  constructor() {
    this.repository = getRepository(Project);
  }

  async findById(id: string): Promise<Project> {
    const project = await this.repository.findOne({ id });

    return project;
  }

  async findByAuthorId(authorId: string): Promise<Project[]> {
    const projects = await this.repository.find({ authorId });

    return projects;
  }

  async findByCampus(campus: string): Promise<Project[]> {
    const projects = await this.repository.find({ campus });

    return projects;
  }

  async findAll(): Promise<Project[]> {
    const projects = await this.repository.find();

    return projects;
  }

  async update({
    id,
    title,
    description,
    authorId,
    campus,
    status,
    extraLink,
  }: IUpdateProjectDTO): Promise<Project> {
    const projecToUpdate = await this.repository.findOne({ id });

    projecToUpdate.title = title;
    projecToUpdate.description = description;
    projecToUpdate.authorId = authorId;
    projecToUpdate.campus = campus;
    projecToUpdate.status = status;
    projecToUpdate.extraLink = extraLink;

    await this.repository.save(projecToUpdate);

    return projecToUpdate;
  }

  async create({
    title,
    description,
    authorId,
    campus,
    status,
    extraLink,
    coverImage,
    views,
    likes
  }: ICreateProjectDTO): Promise<Project> {
    const project = this.repository.create({
      title,
      description,
      authorId,
      campus,
      status,
      extraLink,
      coverImage,
      views,
      likes
    });

    await this.repository.save(project);

    return project
  }

  async save(project: Project): Promise<Project> {
    await this.repository.save(project);
    return project;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async incrementLikes(id: string): Promise<void> {
    const project = await this.repository.findOne({ id });

    project.likes += 1;

    await this.repository.save(project);
  }

  async incrementViews(id: string): Promise<void> {
    const project = await this.repository.findOne({ id });

    project.views += 1;

    await this.repository.save(project);
  }

  async decrementLikes(id: string): Promise<void> {
    const project = await this.repository.findOne({ id });

    project.likes -= 1;

    await this.repository.save(project);
  }
}

