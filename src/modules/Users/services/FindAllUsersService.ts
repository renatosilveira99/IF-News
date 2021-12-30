import { inject, injectable } from 'tsyringe';
import AppError from "../../../utils/AppError";
import { User } from "../entities/User";
import { IUsersRepository } from '../repositories/IUsersRepository';

@injectable()
class FindAllUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) { }


  async execute(): Promise<User[]> {
    const users = await this.usersRepository.findAll();

    if (users.length === 0) {
      throw new AppError('No users registered on the database', 400);
    }

    return users;
  }
}

export { FindAllUsersService };