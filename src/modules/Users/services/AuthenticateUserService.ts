import 'dotenv/config';
import { inject, injectable } from 'tsyringe';
import AppError from "../../../utils/AppError";
import { User } from "../entities/User";
import { compare } from 'bcryptjs';
import { IUsersRepository } from '../repositories/IUsersRepository';
import jwt from 'jsonwebtoken';
import { plainToInstance } from 'class-transformer';

interface IRequest {
  email: string;
  password: string;
}

@injectable()
export class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) { }


  async execute({ email, password }: IRequest): Promise<string> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new AppError('Invalid password', 401);
    }

    const classTransformedUser = plainToInstance(User, user);

    const token = jwt.sign({ user: classTransformedUser }, process.env.JWT_SECRET)

    return token;
  }
}