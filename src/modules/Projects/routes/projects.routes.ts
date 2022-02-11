import { response, Router } from 'express';

import multer from 'multer';
import uploadConfig from '../../../config/upload';
import ensureAuthenticated from '../../../middlewares/ensureAuthenticated';

import { CreateProjectController } from '../controllers/CreateProjectController';
import { FindAllProjectsController } from '../controllers/FindAllProjectsController';
import { FindProjectByIdController } from '../controllers/FindProjectByIdController';
import { FindProjectsByAuthorIdController } from '../controllers/FindProjectsByAuthorIdController';
import { FindProjectsByCampusController } from '../controllers/FindProjectsByCampusController';
import { UpdateProjectController } from '../controllers/UpdateProjectController';
import { UpdateProjectImagesController } from '../controllers/UpdateProjectImagesController';
import { DeleteProjectController } from '../controllers/DeleteProjectController';

const projectsRoutes = Router();

const createProjectController = new CreateProjectController();
const findAllProjectsController = new FindAllProjectsController();
const findProjectByIdController = new FindProjectByIdController();
const findProjectsByAuthorIdController = new FindProjectsByAuthorIdController();
const findProjectsByCampusController = new FindProjectsByCampusController();
const updateProjectImagesController = new UpdateProjectImagesController();
const updateProjectController = new UpdateProjectController();
const deleteProjectController = new DeleteProjectController();

const upload = multer(uploadConfig);

projectsRoutes.use(ensureAuthenticated)

projectsRoutes.post('/create', upload.single('image'), createProjectController.handle);
projectsRoutes.get('/findAll', findAllProjectsController.handle);
projectsRoutes.get('/findById/:id', findProjectByIdController.handle);
projectsRoutes.get('/findByAuthorId/:authorId', findProjectsByAuthorIdController.handle);
projectsRoutes.get('/findByCampus', findProjectsByCampusController.handle);
projectsRoutes.patch('/updateImages/:id', upload.array("images", 3), updateProjectImagesController.handle);
projectsRoutes.put('/update/:id', updateProjectController.handle);
projectsRoutes.delete('/delete/:id', deleteProjectController.handle);

export { projectsRoutes };
