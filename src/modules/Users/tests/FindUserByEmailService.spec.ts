import AppError from '../../../utils/AppError';
import { UsersRepositoryInMemory } from '../repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserService } from '../services/CreateUserService';
import { FindUserByEmailService } from '../services/FindUserByEmailService';

let createUserService: CreateUserService;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let findUserByEmailService: FindUserByEmailService;

describe('Find user by email', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserService = new CreateUserService(
      usersRepositoryInMemory
    )

    findUserByEmailService = new FindUserByEmailService(
      usersRepositoryInMemory
    );
  });

  it('should be able to find an user by email', async () => {
    const user = {
      name: 'fake-name',
      email: 'fake-email',
      password: 'fake-password',
      RA: 'fake-RA',
      isAdmin: false
    };

    const createdUser = await createUserService.execute(user)

    const foundUser = await findUserByEmailService.execute({ email: createdUser.email })

    expect(foundUser).toHaveProperty('id', createdUser.id);
    expect(foundUser).toHaveProperty('name', createdUser.name);
    expect(foundUser).toHaveProperty('email', createdUser.email);
  });
});
