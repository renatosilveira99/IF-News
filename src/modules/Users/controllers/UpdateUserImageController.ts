import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { plainToClass } from 'class-transformer';

import { UpdateUserImageService } from '../services/UpdateUserImageService';
import { User } from '../entities/User';

export class UpdateUserImageController {
  async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserImageService);

    const updatedUser = await updateUserAvatar.execute({
      userId: request.user.id,
      imageFileName: request.file.filename,
    });

    return response.json(plainToClass(User, updatedUser));
  }
}