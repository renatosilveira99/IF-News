import { getRepository } from "typeorm";
import AppError from "../../../utils/AppError";
import { User } from "../entities/User";

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  RA: string;
  isAdmin: boolean;
}

export class CreateUserService {
  async execute({name, email, password, RA, isAdmin }: CreateUserRequest): Promise<User | AppError> {
    const userRepository = getRepository(User);

    const userAlreadyExists = await userRepository.findOne({ where: { email } });

    if(userAlreadyExists) {
      return new AppError('User already exists', 400);
    }

    const newUser = userRepository.create({
      name,
      email,
      password,
      RA,
      isAdmin
    });

    await userRepository.save(newUser);

    return newUser;
  }
}