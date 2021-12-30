import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { UpdateUserService } from '../services/UpdateUserService';
import { plainToClass } from 'class-transformer'
import { User } from '../entities/User';

export class UpdateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, RA } = request.body

    const updateUserService = container.resolve(UpdateUserService); 2

    const createdUser = await updateUserService.execute({
      name,
      email,
      RA,
    });

    return response.status(201).json(plainToClass(User, createdUser))
  }
}