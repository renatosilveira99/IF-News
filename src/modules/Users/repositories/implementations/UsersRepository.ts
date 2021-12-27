import { EntityRepository, getRepository, Repository } from 'typeorm';

import { User } from '../../entities/User';
import { ICreateUserDTO, IUsersRepository } from '../IUsersRepository';

@EntityRepository(User)
class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.repository.findOne({ email });
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

export { UsersRepository };
