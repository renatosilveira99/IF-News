import { Router } from 'express';

import { CreateUserController } from '../controllers/CreateUserController';

const usersRoutes = Router();

const createUserController = new CreateUserController();

usersRoutes.post('/create', createUserController.handle);

export { usersRoutes };
