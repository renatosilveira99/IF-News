import AppError from '../../../utils/AppError';
import { UsersRepositoryInMemory } from '../repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserService } from '../services/CreateUserService';
import { UpdateUserService } from '../services/UpdateUserService';

let createUserService: CreateUserService;
let updateUserService: UpdateUserService;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe('Update user', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserService = new CreateUserService(
      usersRepositoryInMemory
    );
    updateUserService = new UpdateUserService(
      usersRepositoryInMemory
    )

  });

  it('should be able to update an user', async () => {
    const user = {
      name: 'fake-name',
      email: 'fake-email',
      password: 'fake-password',
      RA: 'fake-RA',
      isAdmin: false
    };

    await createUserService.execute(user);

    await updateUserService.execute({
      email: 'fake-email',
      name: 'fake-name-updated',
      RA: 'fake-RA-updated'
    });

    const userCreated = await usersRepositoryInMemory.findByEmail(
      user.email
    );

    expect(userCreated).toHaveProperty('id');
  });

  it('should not be able to update a user with an non-existent email', async () => {
    await expect(
      updateUserService.execute({
        email: 'fake-email',
        name: 'fake-name-updated',
        RA: 'fake-RA-updated'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
