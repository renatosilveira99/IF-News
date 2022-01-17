import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { CreateUserService } from '../services/CreateUserService';
import { plainToInstance } from 'class-transformer'
import { User } from '../entities/User';

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, password, RA, isAdmin = false } = request.body

    const createUserService = container.resolve(CreateUserService);

    const createdUser = await createUserService.execute({
      name,
      email,
      password,
      RA,
      isAdmin
    });

    return response.status(201).json(plainToInstance(User, createdUser))
  }
}