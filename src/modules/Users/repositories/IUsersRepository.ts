
import { User } from '../entities/User';

interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  RA: string;
  isAdmin: boolean;
}

interface IUpdateUserDTO {
  name: string;
  email: string;
  RA: string;
  isAdmin: boolean;
  image: string;
}
interface IUpdateUserImageDTO {
  id: string;
  imageLink: string;
}

interface IUsersRepository {
  create({ name, email, password, RA, isAdmin }: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  findAll(): Promise<User[]>;
  update({ name, email, RA, isAdmin, image }: IUpdateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}

export { IUsersRepository, ICreateUserDTO, IUpdateUserDTO, IUpdateUserImageDTO };
