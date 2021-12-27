import AppError from '../../../utils/AppError';
import { UsersRepositoryInMemory } from '../repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserService } from '../services/CreateUserService';

let createUserService: CreateUserService;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe('Create Category', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserService = new CreateUserService(
      usersRepositoryInMemory
    );
  });

  it('should be able to create a new user', async () => {
    const user = {
      name: 'fake-name',
      email: 'fake-email',
      password: 'fake-password',
      RA: 'fake-RA',
      isAdmin: false
    };

    await createUserService.execute(user);

    const userCreated = await usersRepositoryInMemory.findByEmail(
      user.email
    );

    expect(userCreated).toHaveProperty('id');
  });

  it.only('should not be able to create a new user with an existed email', async () => {
    const user = {
      name: 'fake-name',
      email: 'fake-email',
      password: 'fake-password',
      RA: 'fake-RA',
      isAdmin: false
    };

    await createUserService.execute(user);

    await expect(
      createUserService.execute(user)
    ).rejects.toBeInstanceOf(AppError);
  });
});
