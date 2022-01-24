import { UsersRepositoryInMemory } from '../repositories/in-memory/UsersRepositoryInMemory';
import { StorageProviderInMemory } from '../../../shared/container/StorageProvider/in-memory/StorageProviderInMemory'
import { UpdateUserImageService } from '../services/UpdateUserImageService'
import AppError from '../../../utils/AppError';
import { CreateUserService } from '../services/CreateUserService';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let storageProviderInMemory: StorageProviderInMemory;
let createUserService: CreateUserService;
let updateUserImageService: UpdateUserImageService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    storageProviderInMemory = new StorageProviderInMemory();

    updateUserImageService = new UpdateUserImageService(
      usersRepositoryInMemory,
      storageProviderInMemory,
    );

    createUserService = new CreateUserService(
      usersRepositoryInMemory
    );
  });
  it('should be able to create a new user', async () => {
    const createdUser = await createUserService.execute({
      name: 'fake-name',
      email: 'fake-email',
      password: 'fake-password',
      RA: 'fake-RA',
      isAdmin: false,
    });

    await updateUserImageService.execute({
      userId: createdUser.id,
      imageFileName: 'fake-image.jpg',
    });

    expect(createdUser.image).toBe('fake-image.jpg');
  });

  it('should not be able to update avatar from non existing user', async () => {
    await expect(
      updateUserImageService.execute({
        userId: 'non existing user',
        imageFileName: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    const deleteFile = jest.spyOn(storageProviderInMemory, 'deleteFile');

    const createdUser = await createUserService.execute({
      name: 'fake-name',
      email: 'fake-email',
      password: 'fake-password',
      RA: 'fake-RA',
      isAdmin: false,
    });

    await updateUserImageService.execute({
      userId: createdUser.id,
      imageFileName: 'image.jpg',
    });

    await updateUserImageService.execute({
      userId: createdUser.id,
      imageFileName: 'image2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('image.jpg');
    expect(createdUser.image).toBe('image2.jpg');
  });
});