
import { User } from '../entities/User';

interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  RA: string;
  isAdmin: boolean;
}

interface IUsersRepository {
  create({ name, email, password, RA, isAdmin }: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  findAll(): Promise<User[]>;
  update(user: User): Promise<User>;
  delete(id: string): Promise<void>;
}

export { IUsersRepository, ICreateUserDTO };
