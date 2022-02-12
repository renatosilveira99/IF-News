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
import { IncrementProjectLikesController } from '../controllers/IncrementProjectLikesController';
import { IncrementProjectViewsController } from '../controllers/IncrementProjectViewsController';
import { DecrementProjectLikesController } from '../controllers/DecrementProjectLikesController';

const projectsRoutes = Router();

const createProjectController = new CreateProjectController();
const findAllProjectsController = new FindAllProjectsController();
const findProjectByIdController = new FindProjectByIdController();
const findProjectsByAuthorIdController = new FindProjectsByAuthorIdController();
const findProjectsByCampusController = new FindProjectsByCampusController();
const updateProjectImagesController = new UpdateProjectImagesController();
const updateProjectController = new UpdateProjectController();
const deleteProjectController = new DeleteProjectController();
const incrementProjectLikesController = new IncrementProjectLikesController();
const incrementProjectViewsController = new IncrementProjectViewsController();
const decrementProjectLikesController = new DecrementProjectLikesController();

const upload = multer(uploadConfig);

projectsRoutes.use(ensureAuthenticated)

projectsRoutes.post('/create', upload.single('image'), createProjectController.handle);

projectsRoutes.post('/likes/increment', incrementProjectLikesController.handle);
projectsRoutes.post('/likes/decrement', decrementProjectLikesController.handle);
projectsRoutes.post('/views/decrement', incrementProjectViewsController.handle);

projectsRoutes.get('/findAll', findAllProjectsController.handle);
projectsRoutes.get('/findById/:id', findProjectByIdController.handle);
projectsRoutes.get('/findByAuthorId/:authorId', findProjectsByAuthorIdController.handle);
projectsRoutes.get('/findByCampus', findProjectsByCampusController.handle);

projectsRoutes.patch('/updateImages/:id', upload.array("images", 3), updateProjectImagesController.handle);
projectsRoutes.put('/update/:id', updateProjectController.handle);

projectsRoutes.delete('/delete/:id', deleteProjectController.handle);





export { projectsRoutes };
