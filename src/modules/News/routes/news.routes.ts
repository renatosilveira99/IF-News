import { response, Router } from 'express';

import multer from 'multer';
import uploadConfig from '../../../config/upload';
import ensureAuthenticated from '../../../middlewares/ensureAuthenticated';

import { CreateNewsController } from '../controllers/CreateNewsController';
import { FindAllNewsController } from '../controllers/FindAllNewsController';
import { FindNewsByIdController } from '../controllers/FindNewsByIdController';
import { FindNewsByAuthorIdController } from '../controllers/FindNewsByAuthorIdController';
import { FindNewsByCampusController } from '../controllers/FindNewsByCampusController';
import { UpdateNewsController } from '../controllers/UpdateNewsController';
import { UpdateNewsImagesController } from '../controllers/UpdateNewsImagesController';
import { DeleteNewsController } from '../controllers/DeleteNewsController';
import { IncrementNewsLikesController } from '../controllers/IncrementNewsLikesController';
import { IncrementNewsViewsController } from '../controllers/IncrementNewsViewsController';
import { DecrementNewsLikesController } from '../controllers/DecrementNewsLikesController';

const newsRoutes = Router();

const createNewsController = new CreateNewsController();
const findAllNewsController = new FindAllNewsController();
const findNewsByIdController = new FindNewsByIdController();
const findNewsByAuthorIdController = new FindNewsByAuthorIdController();
const findNewsByCampusController = new FindNewsByCampusController();
const updateNewsImagesController = new UpdateNewsImagesController();
const updateNewsController = new UpdateNewsController();
const deleteNewsController = new DeleteNewsController();
const incrementNewsLikesController = new IncrementNewsLikesController();
const incrementNewsViewsController = new IncrementNewsViewsController();
const decrementNewsLikesController = new DecrementNewsLikesController();

const upload = multer(uploadConfig);

newsRoutes.use(ensureAuthenticated)

newsRoutes.post('/create', upload.single('image'), createNewsController.handle);

newsRoutes.post('/likes/increment', incrementNewsLikesController.handle);
newsRoutes.post('/likes/decrement', decrementNewsLikesController.handle);
newsRoutes.post('/views/decrement', incrementNewsViewsController.handle);

newsRoutes.get('/find_all', findAllNewsController.handle);
newsRoutes.get('/find_by_id/:id', findNewsByIdController.handle);
newsRoutes.get('/find_by_author_id/:authorId', findNewsByAuthorIdController.handle);
newsRoutes.get('/find_by_campus', findNewsByCampusController.handle);

newsRoutes.patch('/update_images/:id', upload.array("images", 3), updateNewsImagesController.handle);
newsRoutes.put('/update/:id', updateNewsController.handle);

newsRoutes.delete('/delete/:id', deleteNewsController.handle);





export { newsRoutes };
