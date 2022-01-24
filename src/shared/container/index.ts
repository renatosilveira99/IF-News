import { container } from 'tsyringe';

import { UsersRepository } from '../../modules/Users/repositories/implementations/UsersRepository';
import { IUsersRepository } from '../../modules/Users/repositories/IUsersRepository';

import { IStorageProvider } from './StorageProvider/models/IStorageProvider';
import { DiskStorageProvider } from './StorageProvider/implementations/DiskStorageProvider';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);