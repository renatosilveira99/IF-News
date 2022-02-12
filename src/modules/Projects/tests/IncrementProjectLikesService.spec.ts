import { StorageProviderInMemory } from '../../../shared/container/StorageProvider/in-memory/StorageProviderInMemory';
import AppError from '../../../utils/AppError';
import { ProjectsRepositoryInMemory } from '../repositories/in-memory/ProjectsRepositoryInMemory';
import { CreateProjectService } from '../services/CreateProjectService';
import { IncrementProjectLikesService } from '../services/IncrementProjectLikesService'

let createProjectService: CreateProjectService;
let storageProviderInMemory: StorageProviderInMemory;
let projectsRepositoryInMemory: ProjectsRepositoryInMemory;
let incrementProjectLikesService: IncrementProjectLikesService;

describe('Increment project likes', () => {
  beforeEach(() => {
    projectsRepositoryInMemory = new ProjectsRepositoryInMemory();
    storageProviderInMemory = new StorageProviderInMemory();

    createProjectService = new CreateProjectService(
      projectsRepositoryInMemory,
      storageProviderInMemory
    );

    incrementProjectLikesService = new IncrementProjectLikesService(
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
    }

    const { id } = await createProjectService.execute(project);

    const projectCreated = await projectsRepositoryInMemory.findById(
      id
    );

    await incrementProjectLikesService.execute({ id: projectCreated.id });

    expect(projectCreated).toHaveProperty('likes', 1);
  });

  it('should not be able to increment a project likes if the project does not exist', async () => {
    await expect(
      incrementProjectLikesService.execute({ id: 'invalid-id' })
    ).rejects.toBeInstanceOf(AppError);
  })
});
