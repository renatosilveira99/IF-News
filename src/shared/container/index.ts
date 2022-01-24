import { container } from 'tsyringe';

import { UsersRepository } from '../../modules/Users/repositories/implementations/UsersRepository';
import { IUsersRepository } from '../../modules/Users/repositories/IUsersRepository';

import { IStorageProvider } from './StorageProvider/entities/IStorageProvider';
import { DiskStorageProvider } from './StorageProvider/implementations/DiskStorageProvider';
import { S3StorageProvider } from './StorageProvider/implementations/S3StorageProvider';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  S3StorageProvider,
);