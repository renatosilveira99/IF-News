import { inject, injectable } from 'tsyringe';
import AppError from "../../../utils/AppError";
import { User } from "../entities/User";
import { IUsersRepository } from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
}

@injectable()
export class FindUserByEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) { }


  async execute({ email }: IRequest): Promise<User> {
    const user = await this.usersRepository.findByEmail(email);

    return user;
  }
}
