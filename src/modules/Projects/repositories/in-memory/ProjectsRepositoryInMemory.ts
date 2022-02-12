import { Project } from '../../entities/Project';
import { ICreateProjectDTO, IProjectsRepository, IUpdateProjectDTO } from '../IProjectsRepository';

export class ProjectsRepositoryInMemory implements IProjectsRepository {
  projects: Project[] = [];

  async findById(id: string): Promise<Project> {
    const project = this.projects.find(project => project.id === id);
    return project;
  }

  async findAll(): Promise<Project[]> {
    return this.projects;
  }

  async update({ id, title, description, status, extraLink, campus, authorId }: IUpdateProjectDTO): Promise<Project> {
    let projectToUpdateIndex = this.projects.findIndex(foundProject => foundProject.id === id);

    this.projects[projectToUpdateIndex].title = title;
    this.projects[projectToUpdateIndex].description = description;
    this.projects[projectToUpdateIndex].status = status;
    this.projects[projectToUpdateIndex].extraLink = extraLink;
    this.projects[projectToUpdateIndex].campus = campus;
    this.projects[projectToUpdateIndex].authorId = authorId;

    return this.projects[projectToUpdateIndex];
  }

  async findByAuthorId(authorId: string): Promise<Project[]> {
    const project = this.projects.filter(project => project.authorId === authorId);
    return project;
  }

  async findByCampus(campus: string): Promise<Project[]> {
    const project = this.projects.filter(project => project.campus === campus);
    return project;
  }

  async create({ title, description, status, extraLink, campus, authorId, coverImage, views, likes }: ICreateProjectDTO): Promise<Project> {
    const project = new Project();

    Object.assign(project, {
      title,
      description,
      status,
      extraLink,
      campus,
      authorId,
      coverImage,
      views,
      likes
    });

    this.projects.push(project);

    return project;
  }

  async save(project: Project): Promise<Project> {
    const findIndex = this.projects.findIndex(
      (findProject) => findProject.id === project.id,
    );

    this.projects[findIndex] = project;
    return project;
  }

  async delete(id: string): Promise<void> {
    const findIndex = this.projects.findIndex(
      (findProject) => findProject.id === id,
    );

    this.projects.splice(findIndex, 1);
  }

  async incrementLikes(id: string): Promise<void> {
    const project = this.projects.find(project => project.id === id);

    project.likes += 1;
  }

  async decrementLikes(id: string): Promise<void> {
    const project = this.projects.find(project => project.id === id);

    project.likes -= 1;
  }

  async incrementViews(id: string): Promise<void> {
    const project = this.projects.find(project => project.id === id);

    project.views += 1;
  }
}
