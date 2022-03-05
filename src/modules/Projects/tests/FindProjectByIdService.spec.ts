import { StorageProviderInMemory } from '../../../shared/container/StorageProvider/in-memory/StorageProviderInMemory';
import AppError from '../../../utils/AppError';
import { UsersRepositoryInMemory } from '../../Users/repositories/in-memory/UsersRepositoryInMemory';
import { ProjectsRepositoryInMemory } from '../repositories/in-memory/ProjectsRepositoryInMemory';
import { CreateProjectService } from '../services/CreateProjectService';
import { FindProjectByIdService } from '../services/FindProjectByIdService';

let createProjectService: CreateProjectService;
let projectsRepositoryInMemory: ProjectsRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let findProjectByIdService: FindProjectByIdService;
let storageProviderInMemory: StorageProviderInMemory;

describe('Find project by id', () => {
  beforeEach(() => {
    projectsRepositoryInMemory = new ProjectsRepositoryInMemory();
    storageProviderInMemory = new StorageProviderInMemory();

    createProjectService = new CreateProjectService(
      projectsRepositoryInMemory,
      storageProviderInMemory
    );

    findProjectByIdService = new FindProjectByIdService(
      projectsRepositoryInMemory,
      usersRepositoryInMemory
    );
  });

  it('should be able to find an project by id', async () => {
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

    const createdProject = await createProjectService.execute(project)

    const foundProject = await findProjectByIdService.execute({ id: createdProject.id })

    expect(foundProject).toHaveProperty('id', createdProject.id);
  });
});
