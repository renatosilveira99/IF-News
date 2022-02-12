import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '../../../config/upload';
import ensureAuthenticated from '../../../middlewares/ensureAuthenticated';

import { CreateUserController } from '../controllers/CreateUserController';
import { FindAllUsersController } from '../controllers/FindAllUsersController';
import { FindUserByIdController } from '../controllers/FindUserByIdController';
import { FindUserByEmailController } from '../controllers/FindUserByEmailController';
import { UpdateUserController } from '../controllers/UpdateUserController';
import { AuthenticateUserController } from '../controllers/AuthenticateUserController';
import { UpdateUserImageController } from '../controllers/UpdateUserImageController';


const usersRoutes = Router();

const createUserController = new CreateUserController();
const findAllUsersController = new FindAllUsersController();
const findUserByIdController = new FindUserByIdController();
const findUserByEmailController = new FindUserByEmailController();
const updateUserController = new UpdateUserController();
const authenticateUserController = new AuthenticateUserController();
const updateUserImageController = new UpdateUserImageController();

const upload = multer(uploadConfig);

usersRoutes.post('/create', ensureAuthenticated, createUserController.handle);
usersRoutes.get('/find_all', findAllUsersController.handle);
usersRoutes.get('/find_by_id/:id', findUserByIdController.handle);
usersRoutes.get('/find_by_email/:email', findUserByEmailController.handle);
usersRoutes.put('/update', ensureAuthenticated, updateUserController.handle);
usersRoutes.post('/authenticate', authenticateUserController.handle);
usersRoutes.patch('/update_image', ensureAuthenticated, upload.single('image'), updateUserImageController.update);

export { usersRoutes };
