import { StorageProviderInMemory } from '../../../shared/container/StorageProvider/in-memory/StorageProviderInMemory';
import AppError from '../../../utils/AppError';
import { ProjectsRepositoryInMemory } from '../repositories/in-memory/ProjectsRepositoryInMemory';
import { CreateProjectService } from '../services/CreateProjectService';
import { IncrementProjectViewsService } from '../services/IncrementProjectViewsService'

let createProjectService: CreateProjectService;
let storageProviderInMemory: StorageProviderInMemory;
let projectsRepositoryInMemory: ProjectsRepositoryInMemory;
let incrementProjectViewsService: IncrementProjectViewsService;

describe('Increment project views', () => {
  beforeEach(() => {
    projectsRepositoryInMemory = new ProjectsRepositoryInMemory();
    storageProviderInMemory = new StorageProviderInMemory();

    createProjectService = new CreateProjectService(
      projectsRepositoryInMemory,
      storageProviderInMemory
    );

    incrementProjectViewsService = new IncrementProjectViewsService(
      projectsRepositoryInMemory,
    );
  });

  it('should be able to increment a project likes', async () => {
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
      images: '[]',
    }

    const { id } = await createProjectService.execute(project);

    const projectCreated = await projectsRepositoryInMemory.findById(
      id
    );

    await incrementProjectViewsService.execute({ id: projectCreated.id });

    expect(projectCreated).toHaveProperty('views', 1);
  });

  it('should not be able to increment a project likes if the project does not exist', async () => {
    await expect(
      incrementProjectViewsService.execute({ id: 'invalid-id' })
    ).rejects.toBeInstanceOf(AppError);
  });
});
