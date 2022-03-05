import { ProjectsRepositoryInMemory } from '../repositories/in-memory/ProjectsRepositoryInMemory';
import { StorageProviderInMemory } from '../../../shared/container/StorageProvider/in-memory/StorageProviderInMemory'
import { UpdateProjectService } from '../services/UpdateProjectService'
import AppError from '../../../utils/AppError';
import { CreateProjectService } from '../services/CreateProjectService';

let projectsRepositoryInMemory: ProjectsRepositoryInMemory;
let storageProviderInMemory: StorageProviderInMemory;
let createProjectService: CreateProjectService;
let updateProjectService: UpdateProjectService;

let project = null

describe('Update Project', () => {
  beforeEach(() => {
    projectsRepositoryInMemory = new ProjectsRepositoryInMemory();
    storageProviderInMemory = new StorageProviderInMemory();

    updateProjectService = new UpdateProjectService(
      projectsRepositoryInMemory,
    );

    createProjectService = new CreateProjectService(
      projectsRepositoryInMemory,
      storageProviderInMemory,
    );

    project = {
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
  });

  it('should be able to update a project', async () => {

    const createProject = await createProjectService.execute(project);

    const updatedProject = await updateProjectService.execute({
      id: createProject.id,
      title: 'fake-title-2',
      description: 'fake-description-2',
      status: 'fake-status-2',
      extraLink: 'fake-extraLink-2',
      campus: 'fake-campus-2',
      authorId: 'fake-authorId',
    });

    expect(updatedProject).not.toBeNull();
    expect(updatedProject.title).toBe('fake-title-2');
    expect(updatedProject.description).toBe('fake-description-2');
  });

  it('should not be able to update non existing project', async () => {
    await expect(
      updateProjectService.execute({
        id: 'fake-id',
        title: 'fake-title-2',
        description: 'fake-description-2',
        status: 'fake-status-2',
        extraLink: 'fake-extraLink-2',
        campus: 'fake-campus-2',
        authorId: 'fake-authorId',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});