import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import AppError from "../../../utils/AppError";
import { User } from "../entities/User";
import { IUsersRepository } from '../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
  RA: string;
  isAdmin: boolean;
}

@injectable()
export class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) { }


  async execute({ name, email, password, RA, isAdmin }: IRequest): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError('User already exists', 400);
    }

    const isParametersMissing = !name || !email || !password || !RA

    if (isParametersMissing) {
      throw new AppError('Missing parameters', 400);
    }

    const passwordHash = await hash(password, 8);

    const newUser = this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      RA,
      isAdmin
    });

    return newUser;
  }
}

