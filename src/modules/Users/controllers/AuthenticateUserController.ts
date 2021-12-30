import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { AuthenticateUserService } from '../services/AuthenticateUserService';

export class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body

    const authenticateUserService = container.resolve(AuthenticateUserService);

    const authenticationToken = await authenticateUserService.execute({
      email,
      password,
    });

    return response.status(200).json({ token: authenticationToken })
  }
}