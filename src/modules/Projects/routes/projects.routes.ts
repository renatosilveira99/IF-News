import { response, Router } from 'express';

import multer from 'multer';
import uploadConfig from '../../../config/upload';
import ensureAuthenticated from '../../../middlewares/ensureAuthenticated';

import { CreateProjectController } from '../controllers/CreateProjectController';
import { FindAllProjectsController } from '../controllers/FindAllProjectsController';
import { FindProjectByIdController } from '../controllers/FindProjectByIdController';
import { FindProjectsByAuthorIdController } from '../controllers/FindProjectsByAuthorIdController';
import { FindProjectsByCampusController } from '../controllers/FindProjectsByCampusController';
import { UpdateProjectImagesController } from '../controllers/UpdateProjectImagesController';

const projectsRoutes = Router();

const createProjectController = new CreateProjectController();
const findAllProjectsController = new FindAllProjectsController();
const findProjectByIdController = new FindProjectByIdController();
const findProjectsByAuthorIdController = new FindProjectsByAuthorIdController();
const findProjectsByCampusController = new FindProjectsByCampusController();
const updateProjectImagesController = new UpdateProjectImagesController();

const upload = multer(uploadConfig);

projectsRoutes.post('/create', ensureAuthenticated, upload.single('image'), createProjectController.handle);
projectsRoutes.get('/findAll', ensureAuthenticated, findAllProjectsController.handle);
projectsRoutes.get('/findById/:id', ensureAuthenticated, findProjectByIdController.handle);
projectsRoutes.get('/findByAuthorId/:authorId', ensureAuthenticated, findProjectsByAuthorIdController.handle);
projectsRoutes.get('/findByCampus', ensureAuthenticated, findProjectsByCampusController.handle);
projectsRoutes.patch('/updateProjectImages', upload.array("images", 3), updateProjectImagesController.handle);

export { projectsRoutes };
