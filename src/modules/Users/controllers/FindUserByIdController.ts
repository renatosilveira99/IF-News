import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { FindUserByIdService } from '../services/FindUserByIdService';

export class FindUserByIdController {
  async handle(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const findUserByIdService = container.resolve(FindUserByIdService);

      const user = await findUserByIdService.execute({ id });

      return response.status(200).json(user)
    } catch (error) {
      return response.status(error.statusCode || 500).json({
        status: 'error',
        message: error.message || 'Unexpected error.'
      });
    }
  }
}