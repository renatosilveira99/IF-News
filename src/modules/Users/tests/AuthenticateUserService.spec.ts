import AppError from '../../../utils/AppError';
import { UsersRepositoryInMemory } from '../repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserService } from '../services/CreateUserService';
import { AuthenticateUserService } from '../services/AuthenticateUserService';

let createUserService: CreateUserService;
let authenticateUserService: AuthenticateUserService;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe('Authenticate user', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserService = new CreateUserService(
      usersRepositoryInMemory
    );
    authenticateUserService = new AuthenticateUserService(
      usersRepositoryInMemory
    )
  });

  it('should be able to authenticate a user', async () => {
    const user = {
      name: 'fake-name',
      email: 'fake-email',
      password: 'fake-password',
      RA: 'fake-RA',
      isAdmin: false
    };

    await createUserService.execute(user);

    const token = await authenticateUserService.execute({
      email: user.email,
      password: user.password
    })

    expect(token).toBeDefined();
  });

  it('should not be able to authenticate a user with non-existing email', async () => {
    await expect(authenticateUserService.execute({
      email: 'fake-email',
      password: 'fake-password'
    })).rejects.toBeInstanceOf(AppError);
  })

  it('should not be able to authenticate a user with wrong password', async () => {
    const user = {
      name: 'fake-name',
      email: 'fake-email',
      password: 'fake-password',
      RA: 'fake-RA',
      isAdmin: false
    };

    await createUserService.execute(user);

    await expect(authenticateUserService.execute({
      email: user.email,
      password: 'wrong-password'
    })).rejects.toBeInstanceOf(AppError);
  })
});
