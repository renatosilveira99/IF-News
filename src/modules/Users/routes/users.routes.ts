import { Router } from 'express';

import { CreateUserController } from '../controllers/CreateUserController';
import { FindAllUsersController } from '../controllers/FindAllUsersController';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const findAllUsersController = new FindAllUsersController();

usersRoutes.post('/create', createUserController.handle);
usersRoutes.get('/findAll', findAllUsersController.handle);

export { usersRoutes };
