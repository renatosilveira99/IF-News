import { StorageProviderInMemory } from '../../../shared/container/StorageProvider/in-memory/StorageProviderInMemory';
import AppError from '../../../utils/AppError';
import { ProjectsRepositoryInMemory } from '../repositories/in-memory/ProjectsRepositoryInMemory';
import { CreateProjectService } from '../services/CreateProjectService';
import { DecrementProjectLikesService } from '../services/DecrementProjectLikesService'

let createProjectService: CreateProjectService;
let storageProviderInMemory: StorageProviderInMemory;
let projectsRepositoryInMemory: ProjectsRepositoryInMemory;
let decrementProjectLikesService: DecrementProjectLikesService;

describe('Decrement project likes', () => {
  beforeEach(() => {
    projectsRepositoryInMemory = new ProjectsRepositoryInMemory();
    storageProviderInMemory = new StorageProviderInMemory();

    createProjectService = new CreateProjectService(
      projectsRepositoryInMemory,
      storageProviderInMemory
    );

    decrementProjectLikesService = new DecrementProjectLikesService(
      projectsRepositoryInMemory,
    );
  });

  it('should be able to decrement a project likes', async () => {
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

    await decrementProjectLikesService.execute({ id: projectCreated.id });

    expect(projectCreated).toHaveProperty('likes', -1);
  });

  it('should not be able to decrement a project likes if the project does not exists', async () => {
    await expect(decrementProjectLikesService.execute({ id: 'fake-id' })).rejects.toBeInstanceOf(AppError);
  })
});
