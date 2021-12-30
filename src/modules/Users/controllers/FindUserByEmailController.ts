import { plainToInstance } from 'class-transformer';
import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { User } from '../entities/User';
import { FindUserByEmailService } from '../services/FindUserByEmailService';

export class FindUserByEmailController {
  async handle(request: Request, response: Response) {
    const { email } = request.params;

    const findUserByEmailService = container.resolve(FindUserByEmailService);

    const user = await findUserByEmailService.execute({ email });

    return response.status(200).json(plainToInstance(User, user));
  }
}