import { EntityRepository, getRepository, Repository } from 'typeorm';

import { User } from '../../entities/User';
import { ICreateUserDTO, IUsersRepository } from '../IUsersRepository';

@EntityRepository(User)
export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({ id });
    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.repository.find();
    return users;
  }

  async update(user: User): Promise<User> {
    let userToUpdate = await this.repository.findOne({ id: user.id });
    userToUpdate = user;
    await this.repository.save(userToUpdate);
    return userToUpdate;
  }

  async delete(id: string): Promise<void> {
    const userToDelete = await this.repository.findOne({ id });
    await this.repository.remove(userToDelete);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });
    return user;
  }

  async create({ name, email, password, RA, isAdmin }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      name,
      email,
      password,
      RA,
      isAdmin
    });

    await this.repository.save(user);

    return user
  }
}

