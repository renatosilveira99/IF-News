import { User } from '../../entities/User';
import { ICreateUserDTO, IUsersRepository } from '../IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find(user => user.email === email);
    return user;
  }

  async create({ name, email, password, RA, isAdmin }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      password,
      RA,
      isAdmin
    });

    this.users.push(user);

    return user;
  }
}

export { UsersRepositoryInMemory };
