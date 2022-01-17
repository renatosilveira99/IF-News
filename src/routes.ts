import { Router } from 'express'
import { usersRoutes } from './modules/Users/routes/Users.routes';

const routes = Router();

routes.use('/users', usersRoutes);

export { routes }