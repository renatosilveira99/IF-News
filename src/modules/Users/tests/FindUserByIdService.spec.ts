import AppError from '../../../utils/AppError';
import { UsersRepositoryInMemory } from '../repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserService } from '../services/CreateUserService';
import { FindUserByIdService } from '../services/FindUserByIdService';

let createUserService: CreateUserService;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let findUserByIdService: FindUserByIdService;

describe('Find user by id', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserService = new CreateUserService(
      usersRepositoryInMemory
    )

    findUserByIdService = new FindUserByIdService(
      usersRepositoryInMemory
    );
  });

  it('should be able to find an user by id', async () => {
    const user = {
      name: 'fake-name',
      email: 'fake-email',
      password: 'fake-password',
      RA: 'fake-RA',
      isAdmin: false
    };

    const createdUser = await createUserService.execute(user)

    const foundUser = await findUserByIdService.execute({ id: createdUser.id })

    expect(foundUser).toHaveProperty('id', createdUser.id);
    expect(foundUser).toHaveProperty('name', createdUser.name);
    expect(foundUser).toHaveProperty('email', createdUser.email);
  });

  it('should throw an error if the user is not found', async () => {
    await expect(
      findUserByIdService.execute({ id: 'fake-id' })
    ).rejects.toBeInstanceOf(AppError);
  });
});
