import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { FindAllUsersService } from '../services/FindAllUsersService';

export class FindAllUsersController {
  async handle(request: Request, response: Response) {
    try {
      const findAllUsersService = container.resolve(FindAllUsersService);

      const users = await findAllUsersService.execute();

      return response.status(200).json(users)
    } catch (error) {
      return response.status(error.statusCode || 500).json({
        status: 'error',
        message: error.message || 'Unexpected error.'
      });
    }
  }
}