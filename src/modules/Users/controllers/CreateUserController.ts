import { Request, Response } from 'express'
import AppError from '../../../utils/AppError';
import { CreateUserService } from '../services/CreateUserService';

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, password, RA, isAdmin } = request.body

    const createUserService = new CreateUserService();

    const result = await createUserService.execute({name, email, password, RA, isAdmin});

    if(result instanceof AppError) {
      return response.status(result.statusCode).json({
        status: 'error',
        message: result.message
      })
    }

    return response.status(201).json(result)
  }
}