import { Router } from 'express'
import { usersRoutes } from './modules/Users/routes/users.routes';
import { projectsRoutes } from './modules/Projects/routes/projects.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/projects', projectsRoutes);

export { routes }