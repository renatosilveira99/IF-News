import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { FindUserByEmailService } from '../services/FindUserByEmailService';

export class FindUserByEmailController {
  async handle(request: Request, response: Response) {
    const { email } = request.params;

    const findUserByEmailService = container.resolve(FindUserByEmailService);

    const user = await findUserByEmailService.execute({ email });

    return response.status(200).json(user)
  }
}