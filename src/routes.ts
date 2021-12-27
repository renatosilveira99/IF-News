import { Router } from 'express'
import { usersRoutes } from './modules/Users/routes/users.routes';

const routes = Router();

routes.use('/users', usersRoutes);

export { routes }