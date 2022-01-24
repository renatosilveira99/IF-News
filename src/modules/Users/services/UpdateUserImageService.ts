import { User } from '../entities/User';
import AppError from '../../../utils/AppError';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { IStorageProvider } from '../../../shared/container/StorageProvider/models/IStorageProvider';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  userId: string;
  imageFileName: string;
}

@injectable()
export class UpdateUserImageService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) { }

  async execute({ userId, imageFileName }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    console.log(userId)

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (user.image) {
      await this.storageProvider.deleteFile(user.image);
    }

    const filename = await this.storageProvider.saveFile(imageFileName);

    user.image = filename;

    await this.usersRepository.save(user);

    return user;
  }
}