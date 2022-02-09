import { StorageProviderInMemory } from '../../../shared/container/StorageProvider/in-memory/StorageProviderInMemory';
import { ProjectsRepositoryInMemory } from '../repositories/in-memory/ProjectsRepositoryInMemory';
import { CreateProjectService } from '../services/CreateProjectService';

let createProjectService: CreateProjectService;
let projectsRepositoryInMemory: ProjectsRepositoryInMemory;
let storageProviderInMemory: StorageProviderInMemory;

describe('Create project', () => {
  beforeEach(() => {
    projectsRepositoryInMemory = new ProjectsRepositoryInMemory();
    storageProviderInMemory = new StorageProviderInMemory();
    createProjectService = new CreateProjectService(
      projectsRepositoryInMemory,
      storageProviderInMemory
    );
  });

  it('should be able to create a new project', async () => {
    const project = {
      title: 'fake-title',
      description: 'fake-description',
      status: 'fake-status',
      extraLink: 'fake-extraLink',
      campus: 'fake-campus',
      authorId: 'fake-authorId',
      coverImage: 'fake-coverImage',
    }

    const { id } = await createProjectService.execute(project);

    const projectCreated = await projectsRepositoryInMemory.findById(
      id
    );

    expect(projectCreated).toHaveProperty('title', project.title);
  });
});
