import { StorageProviderInMemory } from '../../../shared/container/StorageProvider/in-memory/StorageProviderInMemory';
import AppError from '../../../utils/AppError';
import { ProjectsRepositoryInMemory } from '../repositories/in-memory/ProjectsRepositoryInMemory';
import { CreateProjectService } from '../services/CreateProjectService';
import { FindProjectByAuthorIdService } from '../services/FindProjectsByAuthorIdService';

let createProjectService: CreateProjectService;
let projectsRepositoryInMemory: ProjectsRepositoryInMemory;
let findProjectByAuthorIdService: FindProjectByAuthorIdService;
let storageProviderInMemory: StorageProviderInMemory;

describe('Find projects by authorId', () => {
  beforeEach(() => {
    projectsRepositoryInMemory = new ProjectsRepositoryInMemory();
    storageProviderInMemory = new StorageProviderInMemory();

    createProjectService = new CreateProjectService(
      projectsRepositoryInMemory,
      storageProviderInMemory
    );

    findProjectByAuthorIdService = new FindProjectByAuthorIdService(
      projectsRepositoryInMemory
    );
  });

  it('should be able to find projects by authorId', async () => {
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

    const foundProjects = await findProjectByAuthorIdService.execute({ authorId: createdProject.authorId })

    expect(foundProjects).toBeInstanceOf(Array);
    expect(foundProjects).toHaveLength(1);
  });
});
