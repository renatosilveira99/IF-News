import { plainToClass, plainToInstance } from 'class-transformer';
import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { User } from '../entities/User';
import { FindAllUsersService } from '../services/FindAllUsersService';

export class FindAllUsersController {
  async handle(request: Request, response: Response) {
    const findAllUsersService = container.resolve(FindAllUsersService);

    const users = await findAllUsersService.execute();

    return response.status(200).json(plainToInstance(User, users));
  }
}
