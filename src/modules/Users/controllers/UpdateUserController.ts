import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { UpdateUserService } from '../services/UpdateUserService';
import { plainToClass } from 'class-transformer'
import { User } from '../entities/User';

export class UpdateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, RA, isAdmin } = request.body

    const updateUserService = container.resolve(UpdateUserService);

    const updatedUser = await updateUserService.execute({
      name,
      email,
      RA,
      isAdmin
    });

    return response.status(200).json(plainToClass(User, updatedUser))
  }
}