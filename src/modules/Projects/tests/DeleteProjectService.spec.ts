import { StorageProviderInMemory } from '../../../shared/container/StorageProvider/in-memory/StorageProviderInMemory';
import AppError from '../../../utils/AppError';
import { ProjectsRepositoryInMemory } from '../repositories/in-memory/ProjectsRepositoryInMemory';
import { CreateProjectService } from '../services/CreateProjectService';
import { DeleteProjectService } from '../services/DeleteProjectService';
import { UpdateProjectImagesService } from '../services/UpdateProjectImagesService'

let createProjectService: CreateProjectService;
let projectsRepositoryInMemory: ProjectsRepositoryInMemory;
let storageProviderInMemory: StorageProviderInMemory;
let deleteProjectService: DeleteProjectService;
let updateProjectImagesService: UpdateProjectImagesService;

let project = null;
let images = null;

describe('Delete project', () => {
  beforeEach(() => {
    projectsRepositoryInMemory = new ProjectsRepositoryInMemory();
    storageProviderInMemory = new StorageProviderInMemory();
    createProjectService = new CreateProjectService(
      projectsRepositoryInMemory,
      storageProviderInMemory
    );

    updateProjectImagesService = new UpdateProjectImagesService(
      projectsRepositoryInMemory,
      storageProviderInMemory
    );

    deleteProjectService = new DeleteProjectService(
      projectsRepositoryInMemory,
      storageProviderInMemory
    )

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
    }

    images = [{
      fieldname: 'images',
      originalname: 'b3.jpg',
      encoding: '7bit',
      mimetype: 'image/jpeg',
      destination: '/usr/app/tmp',
      filename: 'f751be61e5b132441731-b3.jpg',
      path: '/usr/app/tmp/f751be61e5b132441731-b3.jpg',
      size: 11939
    }]

  });

  it('should be able to delete a project', async () => {
    const { id } = await createProjectService.execute(project);

    const projectCreated = await projectsRepositoryInMemory.findById(
      id
    );

    await deleteProjectService.execute({ id: projectCreated.id });

    const projectDeleted = await projectsRepositoryInMemory.findById(
      id
    );

    expect(projectDeleted).toBeFalsy();
  });

  it('should not be able to delete a project that does not exist', async () => {
    await expect(deleteProjectService.execute({ id: 'fake-id' })).rejects.toBeInstanceOf(AppError);
  })

  it('should delete images', async () => {
    const createdProject = await createProjectService.execute(project);

    await updateProjectImagesService.execute({
      id: createdProject.id,
      images
    });

    await deleteProjectService.execute({ id: createdProject.id });

    const projectDeleted = await projectsRepositoryInMemory.findById(
      createdProject.id
    )

    expect(projectDeleted).toBeFalsy();
  });
});
