import { inject, injectable } from 'tsyringe';
import { Project } from "../entities/Project";
import { IProjectsRepository } from '../repositories/IProjectsRepository';

@injectable()
export class FindAllProjectsService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository
  ) { }


  async execute(): Promise<Project[]> {
    const projects = await this.projectsRepository.findAll();

    return projects;
  }
}