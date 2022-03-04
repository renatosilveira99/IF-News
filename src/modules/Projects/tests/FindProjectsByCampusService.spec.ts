import { StorageProviderInMemory } from '../../../shared/container/StorageProvider/in-memory/StorageProviderInMemory';
import AppError from '../../../utils/AppError';
import { ProjectsRepositoryInMemory } from '../repositories/in-memory/ProjectsRepositoryInMemory';
import { CreateProjectService } from '../services/CreateProjectService';
import { FindProjectsByCampusService } from '../services/FindProjectsByCampusService';

let createProjectService: CreateProjectService;
let projectsRepositoryInMemory: ProjectsRepositoryInMemory;
let findProjectsByCampusService: FindProjectsByCampusService;
let storageProviderInMemory: StorageProviderInMemory;

describe('Find projects by campus', () => {
  beforeEach(() => {
    projectsRepositoryInMemory = new ProjectsRepositoryInMemory();
    storageProviderInMemory = new StorageProviderInMemory();

    createProjectService = new CreateProjectService(
      projectsRepositoryInMemory,
      storageProviderInMemory
    );

    findProjectsByCampusService = new FindProjectsByCampusService(
      projectsRepositoryInMemory
    );
  });

  it('should be able to find projects by campus', async () => {
    const project = {
      title: 'fake-title',
      description: 'fake-description',
      status: 'fake-status',
      extraLink: 'fake-extraLink',
      campus: 'fake-campus',
      authorId: 'fake-authorId',
      coverImage: 'fake-coverImage',
      likes: 0,
      views: 0,
    }

    const createdProject = await createProjectService.execute(project)

    const foundProjects = await findProjectsByCampusService.execute({ campus: createdProject.campus })

    expect(foundProjects).toBeInstanceOf(Array);
    expect(foundProjects).toHaveLength(1);
  });
});
