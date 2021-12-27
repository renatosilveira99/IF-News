import { Request, Response } from 'express'
import { container } from 'tsyringe';
import AppError from '../../../utils/AppError';
import { CreateUserService } from '../services/CreateUserService';

export class CreateUserController {
  async handle(request: Request, response: Response) {
    try {
      const { name, email, password, RA, isAdmin = false } = request.body

      const createUserService = container.resolve(CreateUserService);

      const createdUser = await createUserService.execute({ name, email, password, RA, isAdmin });

      return response.status(201).json(createdUser)
    } catch (error) {
      return response.status(error.statusCode || 500).json({
        status: 'error',
        message: error.message || 'Unexpected error.'
      });
    }
  }
}