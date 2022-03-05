import { StorageProviderInMemory } from '../../../shared/container/StorageProvider/in-memory/StorageProviderInMemory';
import { ProjectsRepositoryInMemory } from '../repositories/in-memory/ProjectsRepositoryInMemory';
import { CreateProjectService } from '../services/CreateProjectService';
import { FindAllProjectsService } from '../services/FindAllProjectsService';

let createProjectService: CreateProjectService;
let findAllProjectsService: FindAllProjectsService;
let projectsRepositoryInMemory: ProjectsRepositoryInMemory;
let storageProviderInMemory: StorageProviderInMemory;

describe('Find all projects', () => {
  beforeEach(() => {
    projectsRepositoryInMemory = new ProjectsRepositoryInMemory();
    storageProviderInMemory = new StorageProviderInMemory();
    createProjectService = new CreateProjectService(
      projectsRepositoryInMemory,
      storageProviderInMemory
    )

    findAllProjectsService = new FindAllProjectsService(
      projectsRepositoryInMemory,
    );
  });

  it('should be able list all projects', async () => {
    const project1 = {
      title: 'fake-title',
      description: 'fake-description',
      status: 'fake-status',
      extraLink: 'fake-extraLink',
      campus: 'fake-campus',
      authorId: 'fake-authorId',
      coverImage: 'fake-coverImage',
      likes: 0,
      views: 0,
      images: '[]',
    }

    const project2 = {
      title: 'fake-title',
      description: 'fake-description',
      status: 'fake-status',
      extraLink: 'fake-extraLink',
      campus: 'fake-campus',
      authorId: 'fake-authorId',
      coverImage: 'fake-coverImage',
      likes: 0,
      views: 0,
      images: '[]',
    }

    await createProjectService.execute(project1)
    await createProjectService.execute(project2)

    const allProjects = await findAllProjectsService.execute();

    expect(allProjects).toBeInstanceOf(Array);
    expect(allProjects).toHaveLength(2);
  });
}); 
