import { container } from 'tsyringe';

import { UsersRepository } from '../../modules/Users/repositories/implementations/UsersRepository';
import { IUsersRepository } from '../../modules/Users/repositories/IUsersRepository';

import { ProjectsRepository } from '../../modules/Projects/repositories/implementations/ProjectsRepository';
import { IProjectsRepository } from '../../modules/Projects/repositories/IProjectsRepository';

import { IStorageProvider } from './StorageProvider/entities/IStorageProvider';
import { DiskStorageProvider } from './StorageProvider/implementations/DiskStorageProvider';
import { S3StorageProvider } from './StorageProvider/implementations/S3StorageProvider';

const storageProvider = process.env.STORAGE_TYPE;

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IProjectsRepository>(
  'ProjectsRepository',
  ProjectsRepository
);

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  storageProvider === 's3' ? S3StorageProvider : DiskStorageProvider
);