import { ProjectsRepositoryInMemory } from '../repositories/in-memory/ProjectsRepositoryInMemory';
import { StorageProviderInMemory } from '../../../shared/container/StorageProvider/in-memory/StorageProviderInMemory'
import { UpdateProjectImagesService } from '../services/UpdateProjectImagesService'
import AppError from '../../../utils/AppError';
import { CreateProjectService } from '../services/CreateProjectService';

let projectsRepositoryInMemory: ProjectsRepositoryInMemory;
let storageProviderInMemory: StorageProviderInMemory;
let createProjectService: CreateProjectService;
let updateProjectImagesService: UpdateProjectImagesService;

let project = null
let images = null

describe('Update Project Images', () => {
  beforeEach(() => {
    projectsRepositoryInMemory = new ProjectsRepositoryInMemory();
    storageProviderInMemory = new StorageProviderInMemory();

    updateProjectImagesService = new UpdateProjectImagesService(
      projectsRepositoryInMemory,
      storageProviderInMemory,
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

  it('should be able to update project images', async () => {

    const createProject = await createProjectService.execute(project);

    const updatedProject = await updateProjectImagesService.execute({
      id: createProject.id,
      images
    });

    expect(updatedProject.images).not.toBeNull();
  });

  it('should not be able to update images from non existing project', async () => {
    await expect(
      updateProjectImagesService.execute({
        id: 'non-existing-project-id',
        images
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old images when updating new ones', async () => {
    const deleteFile = jest.spyOn(storageProviderInMemory, 'deleteFile');

    const createdProject = await createProjectService.execute(project);

    await updateProjectImagesService.execute({
      id: createdProject.id,
      images
    });

    await updateProjectImagesService.execute({
      id: createdProject.id,
      images
    });

    expect(deleteFile).toHaveBeenCalledWith(images[0].filename);
  });
});