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
    const user1 = {
      name: 'fake-name',
      email: 'fake-email',
      password: 'fake-password',
      RA: 'fake-RA',
      isAdmin: false
    };

    const user2 = {
      name: 'fake-name',
      email: 'fake-email-2',
      password: 'fake-password',
      RA: 'fake-RA',
      isAdmin: false
    };

    await createUserService.execute(user1)
    await createUserService.execute(user2)

    const allUsers = await findAllUsersService.execute();

    expect(allUsers).toBeInstanceOf(Array);
    expect(allUsers).toHaveLength(2);
  });
});
