import { User } from '../../entities/User';
import { ICreateUserDTO, IUsersRepository } from '../IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async findById(id: string): Promise<User> {
    const user = this.users.find(user => user.id === id);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async update(user: User): Promise<User> {
    let userToUpdateIndex = this.users.findIndex(foundUser => foundUser.id === user.id);
    this.users[userToUpdateIndex] = user;
    return this.users[userToUpdateIndex];
  }

  async delete(id: string): Promise<void> {
    let userToUpdateIndex = this.users.findIndex(foundUser => foundUser.id === id);
    this.users.splice(userToUpdateIndex, 1);
  }


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
