import { inject, injectable } from 'tsyringe';
import AppError from "../../../utils/AppError";
import { User } from "../entities/User";
import { IUsersRepository } from '../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  RA: string;
  isAdmin: boolean;
  image: string;
}

@injectable()
export class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) { }


  async execute({ name, email, RA, isAdmin, image }: IRequest): Promise<User> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (!userExists) {
      throw new AppError('Usuário não encontrado', 400);
    }

    const updatedUser = this.usersRepository.update({
      name,
      email,
      RA,
      isAdmin,
      image
    });

    return updatedUser;
  }
}

