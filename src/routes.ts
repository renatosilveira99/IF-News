import { Router } from 'express'
import { usersRoutes } from './modules/Users/routes/users.routes';
import { projectsRoutes } from './modules/Projects/routes/projects.routes';
import { newsRoutes } from './modules/News/routes/news.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/projects', projectsRoutes);
routes.use('/news', newsRoutes);

export { routes }