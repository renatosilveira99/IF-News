import AppError from '../../../utils/AppError';
import { UsersRepositoryInMemory } from '../repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserService } from '../services/CreateUserService';
import { FindAllUsersService } from '../services/FindAllUsersService';

let createUserService: CreateUserService;
let findAllUsersService: FindAllUsersService;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe('Find all users', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserService = new CreateUserService(
      usersRepositoryInMemory
    )

    findAllUsersService = new FindAllUsersService(
      usersRepositoryInMemory
    );
  });

  it('should be able list all users', async () => {
    const user = {
      name: 'fake-name',
      email: 'fake-email',
      password: 'fake-password',
      RA: 'fake-RA',
      isAdmin: false
    };

    await createUserService.execute(user)

    const allUsers = await findAllUsersService.execute();

    expect(allUsers).toBeInstanceOf(Array);
    expect(allUsers).not.toHaveLength(0);
  });

  it('should throw an error if the database has no users', async () => {
    await expect(
      findAllUsersService.execute()
    ).rejects.toBeInstanceOf(AppError);
  });
});
