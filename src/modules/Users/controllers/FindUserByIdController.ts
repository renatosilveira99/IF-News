import { plainToInstance } from 'class-transformer';
import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { User } from '../entities/User';
import { FindUserByIdService } from '../services/FindUserByIdService';

export class FindUserByIdController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const findUserByIdService = container.resolve(FindUserByIdService);

    const user = await findUserByIdService.execute({ id });

    return response.status(200).json(plainToInstance(User, user));
  }
}