import { Router } from 'express';

import { CreateUserController } from '../controllers/CreateUserController';
import { FindAllUsersController } from '../controllers/FindAllUsersController';
import { FindUserByIdController } from '../controllers/FindUserByIdController';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const findAllUsersController = new FindAllUsersController();
const findUserByIdController = new FindUserByIdController();

usersRoutes.post('/create', createUserController.handle);
usersRoutes.get('/findAll', findAllUsersController.handle);
usersRoutes.get('/findById/:id', findUserByIdController.handle);

export { usersRoutes };
